"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "../../ui/button";
import { type FieldProps, useFieldContext } from "../types";

type GuestsFieldProps = {
  max: number;
} & FieldProps;

export function GuestsField({ label, max }: GuestsFieldProps) {
  const { field, isInvalid } = useFieldContext<number | undefined>();
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div className="flex gap-1 flex-wrap" id={field.name}>
        {Array.from({ length: max }).map((_, i) => (
          <Button
            key={crypto.randomUUID()}
            aria-invalid={isInvalid}
            variant={field.state.value === i + 1 ? "default" : "outline"}
            className="grow"
            onClick={() => field.handleChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
