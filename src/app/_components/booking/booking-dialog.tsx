"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/client";
import { CheckCircle, CircleAlert } from "lucide-react";
import { SBooking } from "@/components/booking/booking-schema";
import {
  bookingFormOptions,
  useBookingForm,
  withBookingForm,
} from "@/components/form/use-booking-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { FormatTRPCError } from "@/lib/trpc/format-trpc-error";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { AppRouter } from "@/server/routers";
import { BookingForm } from "./booking-form";
import {
  FormState,
  FormStateActions,
  FormStateContent,
  FormStateErrors,
  FormStateIcon,
  FormStateIconBg,
  FormStateProgress,
} from "./state";

export function BookingDialog({ className }: { className?: string }) {
  const trpc = useTRPC();
  // Preload weekly and exceptions
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(trpc.schedule.getWeekly.queryOptions());
  queryClient.prefetchQuery(trpc.schedule.getExceptions.queryOptions());
  const { mutate, status, reset, error } = useMutation(
    trpc.bookings.book.mutationOptions(),
  );
  const { data: settings } = useQuery(trpc.settings.getPublic.queryOptions());
  const form = useBookingForm({
    ...bookingFormOptions,
    validators: {
      onSubmit: SBooking,
    },
    onSubmit: async ({ value }) => {
      mutate(SBooking.parse(value));
    },
  });
  if (settings?.bookingEnabled)
    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open)
            setTimeout(() => {
              reset();
              form.reset();
            }, 200);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className={cn("uppercase px-7 bg-[#000150] rounded", className)}
            size="sm"
          >
            Réserver
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-lg max-h-dvh px-4"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <Content form={form} status={status} reset={reset} error={error} />
        </DialogContent>
      </Dialog>
    );
}

const Content = withBookingForm({
  ...bookingFormOptions,
  props: {
    status: "idle" as "pending" | "error" | "success" | "idle",
    reset: (() => false) as () => void,
    error: null as TRPCClientErrorLike<AppRouter> | null,
  },
  render: ({ form, status, reset, error }) => {
    switch (status) {
      case "pending":
        return (
          <FormState>
            <FormStateIconBg type="pending">
              <FormStateIcon>
                <Spinner className="size-12" />
              </FormStateIcon>
            </FormStateIconBg>
            <FormStateContent title="Traitement en cours…">
              Merci de patienter pendant que nous confirmons votre réservation.
            </FormStateContent>
            <FormStateProgress />
          </FormState>
        );
      case "error":
        return (
          <FormState>
            <FormStateIcon>
              <FormStateIconBg type="error">
                <CircleAlert className="size-12 text-destructive" />
              </FormStateIconBg>
            </FormStateIcon>
            <FormStateContent title="Une erreur est survenue">
              Veuillez vérifier les informations saisies ou réessayer.
            </FormStateContent>
            {error && (
              <FormStateErrors>
                <FormatTRPCError error={error} />
              </FormStateErrors>
            )}
            <FormStateActions>
              <Button onClick={reset}>Réessayer</Button>
            </FormStateActions>
          </FormState>
        );
      case "success":
        return (
          <FormState>
            <FormStateIcon>
              <FormStateIconBg type="success">
                <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
              </FormStateIconBg>
            </FormStateIcon>
            <FormStateContent title={`Merci, ${form.state.values.name}!`}>
              Votre table est réservée.
              <br />
              Un mail a été envoyé à {form.state.values.email}.
            </FormStateContent>
            <FormStateActions>
              <DialogClose asChild>
                <Button>Fermer</Button>
              </DialogClose>
            </FormStateActions>
          </FormState>
        );
      default:
        return <BookingForm form={form} />;
    }
  },
});
