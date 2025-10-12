"use client";

import type { ComponentProps } from "react";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Textarea } from "../../ui/textarea";
import { type FieldProps, useFieldContext } from "../types";

type TextareaProps = ComponentProps<"textarea"> & FieldProps;

export function TextAreaField({ label, ...props }: TextareaProps) {
  const { field, isInvalid } = useFieldContext<string | undefined>();
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        className="shadow-sm"
        id={field.name}
        name={field.name}
        aria-invalid={isInvalid}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
