import { bookingFormOptions, withBookingForm } from "../form/use-booking-form";
import { BookingDateForm, BookingUserForm } from "./booking-base-form";

export const BookingAdminForm = withBookingForm({
  ...bookingFormOptions,
  render: ({ form }) => {
    return (
      <>
        <BookingUserForm form={form} />
        <form.AppField name="guests">
          {(field) => <field.NumberField label="Nombre de personnes" />}
        </form.AppField>
        <BookingDateForm form={form} />
        <form.AppField name="notes">
          {(field) => <field.TextAreaField label="Notes" />}
        </form.AppField>
      </>
    );
  },
});
