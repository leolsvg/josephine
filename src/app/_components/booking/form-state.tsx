import {
  bookingFormOptions,
  withBookingForm,
} from "@/components/form/use-booking-form";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingForm } from "./booking-form";

export const FormState = withBookingForm({
  ...bookingFormOptions,
  render: ({ form }) => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Réserver une table</DialogTitle>
          <DialogDescription>
            Merci de compléter les informations nécessaires afin de planifier
            votre réservation.
          </DialogDescription>
        </DialogHeader>
        <BookingForm form={form} />
      </>
    );
  },
});
