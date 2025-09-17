import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { formatInTimeZone } from "date-fns-tz";
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
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-3">
            <form.AppField name="name">
              {(field) => <field.TextField label="Nom" type="text" />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.TextField label="Email" type="email" />}
            </form.AppField>
            <form.AppField name="phone">
              {(field) => <field.PhoneField label="Téléphone" />}
            </form.AppField>

            <form.AppField name="guests">
              {(field) => (
                <field.NumberField
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
                      label="Date"
                      date={dateField.state.value}
                      time={timeField.state.value}
                      onDateChange={dateField.handleChange}
                      onTimeChange={timeField.handleChange}
                      disabled={(date) => {
                        return !isDateOpen(date, weekly, exceptions);
                      }}
                      timeSlots={(date) => {
                        return generateSlots(weekly, date, exceptions);
                      }}
                    />
                  )}
                </form.AppField>
              )}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.TextAreaField label="Notes" />}
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
