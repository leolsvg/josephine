"use client";

import type { ComponentProps } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FieldErrors } from "./field-errors";
import { FormField } from "./form-field";
import { type FieldProps, useFieldContext } from "./types";

type TextareaProps = ComponentProps<"textarea"> & FieldProps;

export function TextAreaField({ label, ...props }: TextareaProps) {
  const field = useFieldContext<string | undefined>();
  return (
    <FormField>
      <Label className="mb-3" htmlFor={label}>
        {label}
      </Label>
      <Textarea
        className="shadow-sm"
        {...props}
        id={label}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldErrors />
    </FormField>
  );
}
