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

export const FormState = withBookingForm({
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
        <DialogHeader>
          <DialogTitle>Réserver une table</DialogTitle>
          <DialogDescription>
            Merci de compléter les informations nécessaires afin de planifier
            votre réservation.
          </DialogDescription>
        </DialogHeader>
        <Suspense fallback={<PendingFormData />}>
          <div className="flex flex-col gap-3">
            <BookingBaseForm form={form} />
          </div>
          <DialogFooter>
            <form.AppForm>
              <form.SubmitButton>Réserver</form.SubmitButton>
            </form.AppForm>
          </DialogFooter>
        </Suspense>
      </form>
    );
  },
});
