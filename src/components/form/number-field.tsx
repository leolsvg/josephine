"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import { FormField } from "./form-field";
import { type InputProps, useFieldContext } from "./types";

export function NumberField({ label, ...props }: InputProps) {
  const field = useFieldContext<number | undefined>();
  return (
    <FormField>
      <Label className="mb-3" htmlFor={label}>
        {label}
      </Label>
      <Input
        className="shadow-sm"
        type="number"
        {...props}
        id={label}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(Number(e.target.value))}
        onBlur={field.handleBlur}
      />
      <FieldErrors />
    </FormField>
  );
}
