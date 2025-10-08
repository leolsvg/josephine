"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { DateTimeField } from "@/components/form/fields/date-time-field";
import {
  bookingFormOptions,
  withBookingForm,
} from "@/components/form/use-booking-form";
import { useTRPC } from "@/lib/trpc/react";
import { isDateOpen, timesGroupsForDate } from "@/lib/utils/schedule";
import { useSchedule } from "./use-schedule";

export const BookingBaseForm = withBookingForm({
  ...bookingFormOptions,
  render: ({ form }) => {
    const { exceptions, weekly } = useSchedule();
    const trpc = useTRPC();
    const { data: settings } = useSuspenseQuery(
      trpc.settings.getPublic.queryOptions(),
    );
    return (
      <>
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
            <field.GuestsField
              id="guests"
              label="Nombre de personnes"
              max={settings.maxGuestsPerBooking}
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
                  date={dateField.state.value?.toString()}
                  time={timeField.state.value?.toString()}
                  onDateChange={(date) => {
                    const d = date ? Temporal.PlainDate.from(date) : undefined;
                    dateField.handleChange(d);
                  }}
                  onTimeChange={(time) => {
                    const t = time ? Temporal.PlainTime.from(time) : undefined;
                    timeField.handleChange(t);
                  }}
                  disabled={(date) => {
                    return !isDateOpen(date, weekly, exceptions);
                  }}
                  timeSlots={(date) => {
                    return timesGroupsForDate(date, weekly, exceptions);
                  }}
                />
              )}
            </form.AppField>
          )}
        </form.AppField>
        <form.AppField name="notes">
          {(field) => <field.TextAreaField label="Notes" id="notes" />}
        </form.AppField>
      </>
    );
  },
});
