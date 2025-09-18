import { DateTimeField } from "@/components/form/date-time-field";
import {
  bookingFormOptions,
  withBookingForm,
} from "@/components/form/use-booking-form";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateSlots, isDateOpen } from "@/server/services/bookings/utils";
import { MAX_GUESTS, MIN_GUESTS } from "./schema";
import { useSchedule } from "./use-schedule";

export const FormState = withBookingForm({
  ...bookingFormOptions,
  render: ({ form }) => {
    const { exceptions, weekly } = useSchedule();
    return (
      <>
        <DialogHeader>
          <DialogTitle>Réserver une table</DialogTitle>
          <DialogDescription>
            Merci de compléter les informations nécessaires afin de planifier
            votre réservation.
          </DialogDescription>
        </DialogHeader>
        <form
          autoComplete="on"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-3">
            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Nom"
                  id="name"
                  type="text"
                  autoComplete="name"
                />
              )}
            </form.AppField>
            <form.AppField name="email">
              {(field) => (
                <field.TextField
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                />
              )}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => (
                <field.PhoneField
                  label="Téléphone"
                  id="phone"
                  autoComplete="phone"
                />
              )}
            </form.AppField>

            <form.AppField name="guests">
              {(field) => (
                <field.NumberField
                  id="guests"
                  label="Nombre de personnes"
                  type="number"
                  min={MIN_GUESTS}
                  max={MAX_GUESTS}
                />
              )}
            </form.AppField>

            <form.AppField name="date">
              {(dateField) => (
                <form.AppField name="time">
                  {(timeField) => (
                    <DateTimeField
                      id="date"
                      label="Date"
                      date={dateField.state.value}
                      time={timeField.state.value}
                      onDateChange={dateField.handleChange}
                      onTimeChange={timeField.handleChange}
                      disabled={(date) => {
                        return !isDateOpen(date, weekly, exceptions);
                      }}
                      timeSlots={(date) => {
                        return generateSlots(date, weekly, exceptions);
                      }}
                    />
                  )}
                </form.AppField>
              )}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.TextAreaField label="Notes" id="notes" />}
            </form.AppField>
            <form.AppForm>
              <form.SubmitButton>Réserver</form.SubmitButton>
            </form.AppForm>
          </div>
        </form>
      </>
    );
  },
});
