"use client";

import { useQuery } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/client";
import { CheckCircle, CircleAlert } from "lucide-react";
import { withForm } from "@/components/form/use-app-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import {
  BookingDialogActions,
  BookingDialogContent,
  BookingDialogError,
  BookingDialogIcon,
  BookingDialogIconBg,
  BookingDialogProgress,
  BookingDialogRoot,
} from "@/feat/booking/components/home/booking-dialog-state";
import { FormatTRPCError } from "@/lib/trpc/format-trpc-error";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { AppRouter } from "@/server/routers";
import {
  bookingFormOptions,
  useBookingForm,
} from "../../hooks/use-booking-form";
import { BookingDialogForm } from "./booking-dialog-form";
import { usePrefetchSchedule } from "./use-schedule";

export function BookingDialog({ className }: { className?: string }) {
  const trpc = useTRPC();
  usePrefetchSchedule();
  const { data: settings } = useQuery(trpc.settings.getPublic.queryOptions());
  const { form, reset, status, error } = useBookingForm();
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
          className="sm:max-w-lg max-h-[calc(100dvh-1.5rem)] overflow-y-auto"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <Content form={form} status={status} reset={reset} error={error} />
        </DialogContent>
      </Dialog>
    );
}

const Content = withForm({
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
          <BookingDialogRoot>
            <BookingDialogIconBg type="pending">
              <BookingDialogIcon>
                <Spinner className="size-12" />
              </BookingDialogIcon>
            </BookingDialogIconBg>
            <BookingDialogContent title="Traitement en cours…">
              Merci de patienter pendant que nous confirmons votre réservation.
            </BookingDialogContent>
            <BookingDialogProgress />
          </BookingDialogRoot>
        );
      case "error":
        return (
          <BookingDialogRoot>
            <BookingDialogIcon>
              <BookingDialogIconBg type="error">
                <CircleAlert className="size-12 text-destructive" />
              </BookingDialogIconBg>
            </BookingDialogIcon>
            <BookingDialogContent title="Une erreur est survenue">
              Veuillez vérifier les informations saisies ou réessayer.
            </BookingDialogContent>
            {error && (
              <BookingDialogError>
                <FormatTRPCError error={error} />
              </BookingDialogError>
            )}
            <BookingDialogActions>
              <Button onClick={reset}>Réessayer</Button>
            </BookingDialogActions>
          </BookingDialogRoot>
        );
      case "success":
        return (
          <BookingDialogRoot>
            <BookingDialogIcon>
              <BookingDialogIconBg type="success">
                <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
              </BookingDialogIconBg>
            </BookingDialogIcon>
            <BookingDialogContent title={`Merci, ${form.state.values.name}!`}>
              Votre table est réservée.
              <br />
              Un mail a été envoyé à {form.state.values.email}.
            </BookingDialogContent>
            <BookingDialogActions>
              <DialogClose asChild>
                <Button>Fermer</Button>
              </DialogClose>
            </BookingDialogActions>
          </BookingDialogRoot>
        );
      default:
        return <BookingDialogForm form={form} />;
    }
  },
});
