"use client";

import { useMutation } from "@tanstack/react-query";
import { Edit, Plus } from "lucide-react";
import { toast } from "sonner";
import { BookingForm } from "@/app/_components/booking/booking-form";
import { SBooking } from "@/app/_components/booking/schema";
import {
  bookingFormOptions,
  type TDefaultBooking,
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
import type { TBooking } from "@/server/db/types";

export function PatchBookingDialog({
  id,
  booking,
}: {
  id: TBooking["id"];
  booking: TDefaultBooking;
}) {
  const trpc = useTRPC();
  const { mutate } = useMutation(
    trpc.bookings.patch.mutationOptions({
      onSuccess: () => toast.success("Réservation mise à jour"),
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useBookingForm({
    defaultValues: booking,
    validators: {
      onSubmit: SBooking,
    },
    onSubmit: async ({ value }) => {
      mutate({ id, value: SBooking.parse(value) });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier une réservation</DialogTitle>
          <DialogDescription>
            En tant qu'administrateur, vous pouvez modifier une réservation.
          </DialogDescription>
        </DialogHeader>
        <BookingForm form={form} />
      </DialogContent>
    </Dialog>
  );
}
