"use client";

import { Field, FieldError, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { type InputProps, useFieldContext } from "../types";

export function NumberField({ label, ...props }: InputProps) {
  const field = useFieldContext<number | undefined>();
  return (
    <Field>
      <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
      <Input
        className="shadow-sm"
        type="number"
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        onBlur={field.handleBlur}
        {...props}
      />
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}
