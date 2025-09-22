"use client";

import { createFormHook } from "@tanstack/react-form";
import { NumberField } from "@/components/form/number-field";
import { SubmitButton } from "@/components/form/submit-button";
import { fieldContext, formContext } from "@/components/form/types";

export const { useAppForm: useSettingsForm, withForm: withSettingsForm } =
  createFormHook({
    fieldComponents: {
      NumberField,
    },
    formComponents: {
      SubmitButton,
    },
    fieldContext,
    formContext,
  });
