"use client";

import { createFormHookContexts } from "@tanstack/react-form";
import type { ComponentProps } from "react";

export interface FieldProps {
  label: string;
  id: string;
}

export type InputProps = ComponentProps<"input"> & FieldProps;

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();
