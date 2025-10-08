"use client";

import type { ComponentProps } from "react";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Textarea } from "../../ui/textarea";
import { type FieldProps, useFieldContext } from "../types";

type TextareaProps = ComponentProps<"textarea"> & FieldProps;

export function TextAreaField({ label, id, ...props }: TextareaProps) {
  const field = useFieldContext<string | undefined>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        className="shadow-sm"
        id={id}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}
