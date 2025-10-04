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
      <form
        className="contents"
        autoComplete="on"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="px-2">
          <DialogTitle>Réserver une table</DialogTitle>
          <DialogDescription>
            Merci de compléter les informations nécessaires afin de planifier
            votre réservation.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-2 py-1">
          <Suspense fallback={<PendingFormData />}>
            <div className="flex flex-col gap-3">
              <BookingBaseForm form={form} />
            </div>
          </Suspense>
        </div>
        <DialogFooter className="px-2">
          <form.AppForm>
            <form.SubmitButton>Réserver</form.SubmitButton>
          </form.AppForm>
        </DialogFooter>
      </form>
    );
  },
});
