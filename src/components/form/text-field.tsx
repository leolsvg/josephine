"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import { FormField } from "./form-field";
import { type InputProps, useFieldContext } from "./types";

export function TextField({ label, id, ...props }: InputProps) {
  const field = useFieldContext<string | undefined>();
  return (
    <FormField>
      <Label className="mb-3" htmlFor={id}>
        {label}
      </Label>
      <Input
        className="shadow-sm"
        {...props}
        id={id}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      <FieldErrors />
    </FormField>
  );
}
