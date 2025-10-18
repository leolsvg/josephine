import { Suspense } from "react";
import { withForm } from "@/components/form/use-app-form";
import { PendingData } from "@/components/pending-data";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingBaseForm } from "@/feat/booking/components/home/booking-base-form";
import { bookingFormOptions } from "../../hooks/use-booking-form";

export const BookingDialogForm = withForm({
  ...bookingFormOptions,
  render: ({ form }) => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Réserver une table</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            Merci de compléter les informations nécessaires afin de planifier
            votre réservation.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<PendingData />}>
          <form
            id="booking-form"
            className="flex flex-col gap-3"
            autoComplete="on"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <BookingBaseForm form={form} />
          </form>
        </Suspense>
        <DialogFooter>
          <form.AppForm>
            <form.SubmitButton form="booking-form">Réserver</form.SubmitButton>
          </form.AppForm>
        </DialogFooter>
      </>
    );
  },
});
