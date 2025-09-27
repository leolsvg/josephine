"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/client";
import { SBooking } from "@/components/booking/booking-schema";
import {
  bookingFormOptions,
  useBookingForm,
  withBookingForm,
} from "@/components/form/use-booking-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { AppRouter } from "@/server/routers";
import { ErrorState } from "./error-state";
import { FormState } from "./form-state";
import { Pending } from "./pending-state";
import { SuccessState } from "./success-state";

export function BookingDialog({ className }: { className?: string }) {
  const trpc = useTRPC();
  // Preload weekly and exceptions
  const queryClient = useQueryClient();
  queryClient.prefetchQuery(trpc.schedule.getWeekly.queryOptions());
  queryClient.prefetchQuery(trpc.schedule.getExceptions.queryOptions());
  const { mutate, status, reset, error } = useMutation(
    trpc.bookings.book.mutationOptions(),
  );
  const form = useBookingForm({
    ...bookingFormOptions,
    validators: {
      onSubmit: SBooking,
    },
    onSubmit: async ({ value }) => {
      mutate(SBooking.parse(value));
    },
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) form.reset();
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
        return <Pending />;
      case "error":
        return <ErrorState reset={reset} error={error} />;
      case "success":
        return <SuccessState form={form} reset={reset} />;
      default:
        return <FormState form={form} />;
    }
  },
});
