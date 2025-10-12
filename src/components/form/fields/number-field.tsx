"use client";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { type InputProps, useFieldContext } from "../types";

export function NumberField({ label, ...props }: InputProps) {
  const { field, isInvalid } = useFieldContext<number | undefined>();
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        className="shadow-sm"
        type="number"
        id={field.name}
        name={field.name}
        aria-invalid={isInvalid}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        onBlur={field.handleBlur}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
