"use client";

import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { BookingBaseForm } from "@/components/booking/booking-base-form";
import { SBookingAdminPut } from "@/components/booking/booking-schema";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  type TDefaultBooking,
  useBookingForm,
} from "@/components/form/use-booking-form";
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
import { useTRPC } from "@/lib/trpc/react";
import type { TBooking } from "@/server/db/types";

export function PatchBookingDialog({
  id,
  booking,
}: {
  id: TBooking["id"];
  booking: TDefaultBooking;
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
  const form = useBookingForm({
    defaultValues: booking,
    validators: {
      onSubmit: SBookingAdminPut,
    },
    onSubmit: async ({ value }) => {
      mutate({ id, value: SBookingAdminPut.parse(value) });
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
        <form
          className="contents"
          autoComplete="on"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Modifier une réservation</DialogTitle>
            <DialogDescription>
              En tant qu'administrateur, vous pouvez modifier une réservation.
            </DialogDescription>
          </DialogHeader>
          <Suspense fallback={<PendingFormData />}>
            <div className="flex flex-col gap-3">
              <BookingBaseForm form={form} />
            </div>
            <DialogFooter>
              <form.AppForm>
                <form.SubmitButton isPending={isPending}>
                  Modifier
                </form.SubmitButton>
              </form.AppForm>
            </DialogFooter>
          </Suspense>
        </form>
      </DialogContent>
    </Dialog>
  );
}
