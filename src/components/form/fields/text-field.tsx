"use client";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { type InputProps, useFieldContext } from "../types";

export function TextField({ label, ...props }: InputProps) {
  const { field, isInvalid } = useFieldContext<string | undefined>();
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
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
