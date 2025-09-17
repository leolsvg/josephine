"use client";

import { createFormHook, formOptions } from "@tanstack/react-form";
import { NumberField } from "@/components/form/number-field";
import { SubmitButton } from "@/components/form/submit-button";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import { fieldContext, formContext } from "@/components/form/types";
import type { TBooking } from "@/server/db/types";
import { DateTimeField } from "./date-time-field";
import { PhoneField } from "./phone-field";

export const { useAppForm: useBookingForm, withForm: withBookingForm } =
  createFormHook({
    fieldComponents: {
      TextField,
      TextAreaField,
      DateTimeField,
      NumberField,
      PhoneField,
    },
    formComponents: {
      SubmitButton,
    },
    fieldContext,
    formContext,
  });

export const defaultBooking: Partial<
  Omit<TBooking, "id" | "status" | "createdAt" | "updatedAt">
> = {
  date: undefined,
  time: undefined,
  email: undefined,
  name: undefined,
  guests: undefined,
  phone: undefined,
  notes: undefined,
};

export const bookingFormOptions = formOptions({
  defaultValues: defaultBooking,
});
