"use client";

import { createFormHookContexts } from "@tanstack/react-form";
import type { ComponentProps } from "react";

export interface FieldProps {
  label: string;
}

export type InputProps = ComponentProps<"input"> & FieldProps;

const formHooks = createFormHookContexts();

export function useFieldContext<T>() {
  const field = formHooks.useFieldContext<T>();
  return {
    field,
    isInvalid: field.state.meta.isTouched && !field.state.meta.isValid,
  };
}

export const { fieldContext, formContext, useFormContext } = formHooks;
