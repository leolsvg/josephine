"use client";

import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
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
import type { TBooking } from "@/feat/booking/db/types";
import { SBookingAdminPatch } from "@/feat/booking/utils/booking-schema";
import { useTRPC } from "@/lib/trpc/react";
import { BookingAdminForm } from "./booking-admin-form";

export function PatchBookingDialog({
  id,
  booking,
}: {
  id: TBooking["id"];
  booking: Partial<TBooking>;
}) {
  const [open, setOpen] = useState(false);
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.patch.mutationOptions({
      onSuccess: () => {
        setOpen(false);
        toast.success("Réservation mise à jour");
      },
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useAppForm({
    defaultValues: booking,
    validators: {
      onSubmit: SBookingAdminPatch,
    },
    onSubmit: ({ value }) => {
      mutate({ id, value: SBookingAdminPatch.parse(value) });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier une réservation</DialogTitle>
          <DialogDescription>Modifier une réservation.</DialogDescription>
        </DialogHeader>
        <Suspense fallback={<PendingData />}>
          <form
            id="patch-booking-form"
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
        </Suspense>
        <DialogFooter>
          <form.AppForm>
            <form.SubmitButton isPending={isPending} form="patch-booking-form">
              Modifier
            </form.SubmitButton>
          </form.AppForm>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
