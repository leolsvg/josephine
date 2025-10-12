"use client";

import { createFormHook, formOptions } from "@tanstack/react-form";
import { NumberField } from "@/components/form/fields/number-field";
import { TextField } from "@/components/form/fields/text-field";
import { TextAreaField } from "@/components/form/fields/textarea-field";
import { SubmitButton } from "@/components/form/submit-button";
import { fieldContext, formContext } from "@/components/form/types";
import type { TBooking } from "@/server/db/types";
import { GuestsField } from "./fields/guests-field";
import { PhoneField } from "./fields/phone-field";

export const { useAppForm: useBookingForm, withForm: withBookingForm } =
  createFormHook({
    fieldComponents: {
      TextField,
      TextAreaField,
      NumberField,
      PhoneField,
      GuestsField,
    },
    formComponents: {
      SubmitButton,
    },
    fieldContext,
    formContext,
  });

export type TDefaultBooking = Partial<
  Omit<TBooking, "id" | "status" | "createdAt" | "updatedAt">
>;

export const defaultBooking: TDefaultBooking = {
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
