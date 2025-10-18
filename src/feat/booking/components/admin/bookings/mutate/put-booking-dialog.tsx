"use client";

import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-app-form";
import { PendingData } from "@/components/pending-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bookingFormOptions } from "@/feat/booking/hooks/use-booking-form";
import { SBookingAdminPut } from "@/feat/booking/utils/booking-schema";
import { useTRPC } from "@/lib/trpc/react";
import { BookingAdminForm } from "./booking-admin-form";

export function PutBookingDialog() {
  const [open, setOpen] = useState(false);
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.put.mutationOptions({
      onSuccess: () => {
        setOpen(false);
        toast.success("Réservation ajoutée");
      },
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useAppForm({
    defaultValues: {
      ...bookingFormOptions.defaultValues,
    },
    validators: {
      onSubmit: SBookingAdminPut,
    },
    onSubmit: ({ value }) => {
      mutate(SBookingAdminPut.parse(value));
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une réservation</DialogTitle>
          <DialogDescription>
            Créer une réservation sans envoi d'un mail de confirmation.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<PendingData />}>
          <form
            id="put-booking-form"
            className="flex flex-col gap-3"
            autoComplete="on"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <BookingAdminForm form={form} />
          </form>
          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton isPending={isPending} form="put-booking-form">
                Ajouter
              </form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
