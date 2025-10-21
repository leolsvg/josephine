"use client";

import { useCallback } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "../../ui/button";
import { type FieldProps, useFieldContext } from "../types";

type GuestsFieldProps = {
  max: number;
} & FieldProps;

export function GuestsField({ label, max }: GuestsFieldProps) {
  const { field, isInvalid } = useFieldContext<number | undefined>();
  const variant = useCallback(
    (i: number) => (field.state.value === i + 1 ? "default" : "outline"),
    [field.state.value],
  );
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(3rem,1fr))] gap-1"
        id={field.name}
      >
        {Array.from({ length: max }, (_, i) => i).map((i) => (
          <Button
            key={i}
            aria-invalid={isInvalid}
            type="button"
            variant={variant(i)}
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
