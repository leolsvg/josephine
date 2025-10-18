import { withForm } from "@/components/form/use-app-form";
import {
  BookingDateForm,
  BookingUserForm,
} from "@/feat/booking/components/home/booking-base-form";
import { bookingFormOptions } from "../../../../hooks/use-booking-form";

export const BookingAdminForm = withForm({
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
