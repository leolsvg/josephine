"use client";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { type InputProps, useFieldContext } from "../types";

export function TextField({ label, id, ...props }: InputProps) {
  const field = useFieldContext<string | undefined>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
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
