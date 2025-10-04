"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { type FieldProps, useFieldContext } from "../form/types";
import { Button } from "../ui/button";

type GuestsFieldProps = {
  max: number;
} & FieldProps;

export function GuestsField({ id, label, max }: GuestsFieldProps) {
  const field = useFieldContext<number | undefined>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="flex gap-1 flex-wrap justify-center">
        {Array.from({ length: max }).map((_, i) => (
          <Button
            key={crypto.randomUUID()}
            variant={field.state.value === i + 1 ? "default" : "outline"}
            className="size-12"
            onClick={() => field.handleChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}
