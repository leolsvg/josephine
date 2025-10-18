"use client";

import { createFormHook } from "@tanstack/react-form";
import { NumberField } from "@/components/form/fields/number-field";
import { TextField } from "@/components/form/fields/text-field";
import { TextAreaField } from "@/components/form/fields/textarea-field";
import { SubmitButton } from "@/components/form/submit-button";
import { fieldContext, formContext } from "@/components/form/types";
import { GuestsField } from "./fields/guests-field";
import { PhoneField } from "./fields/phone-field";

export const { useAppForm, withForm } = createFormHook({
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
