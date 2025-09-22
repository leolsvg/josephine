"use client";

import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { BookingForm } from "@/app/_components/booking/booking-form";
import { SBooking } from "@/app/_components/booking/schema";
import {
  bookingFormOptions,
  useBookingForm,
} from "@/components/form/use-booking-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTRPC } from "@/lib/trpc/react";

export function PutBookingDialog() {
  const trpc = useTRPC();
  const { mutate } = useMutation(trpc.bookings.put.mutationOptions());
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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une réservation</DialogTitle>
          <DialogDescription>
            En tant qu'administrateur, vous pouvez créer une réservation
            directement, sans validation automatique.
          </DialogDescription>
        </DialogHeader>
        <BookingForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
