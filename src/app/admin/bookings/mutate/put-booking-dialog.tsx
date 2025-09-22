"use client";

import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { toast } from "sonner";
import { BookingBaseForm } from "@/components/booking/booking-base-form";
import { SBooking } from "@/components/booking/booking-schema";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  bookingFormOptions,
  useBookingForm,
} from "@/components/form/use-booking-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTRPC } from "@/lib/trpc/react";

export function PutBookingDialog() {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.put.mutationOptions({
      onSuccess: () => toast.success("Réservation ajoutée"),
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useBookingForm({
    defaultValues: {
      ...bookingFormOptions.defaultValues,
    },
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
        <form
          className="contents"
          autoComplete="on"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Ajouter une réservation</DialogTitle>
            <DialogDescription>
              En tant qu'administrateur, vous pouvez créer une réservation
              directement, sans validation automatique.
            </DialogDescription>
          </DialogHeader>
          <Suspense fallback={<PendingFormData />}>
            <div className="flex flex-col gap-3">
              <BookingBaseForm form={form} />
            </div>
            <DialogFooter>
              <form.AppForm>
                <DialogClose asChild>
                  <form.SubmitButton isPending={isPending}>
                    Ajouter
                  </form.SubmitButton>
                </DialogClose>
              </form.AppForm>
            </DialogFooter>
          </Suspense>
        </form>
      </DialogContent>
    </Dialog>
  );
}
