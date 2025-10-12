import { Suspense } from "react";
import { BookingBaseForm } from "@/components/booking/booking-base-form";
import { PendingFormData } from "@/components/form/pending-form-data";
import {
  bookingFormOptions,
  withBookingForm,
} from "@/components/form/use-booking-form";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const BookingForm = withBookingForm({
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
        <Suspense fallback={<PendingFormData />}>
          <form
            id="booking-form"
            className="flex flex-col gap-3"
            autoComplete="on"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
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
