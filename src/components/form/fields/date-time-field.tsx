import type { ComponentProps } from "react";
import { DateTimeInput } from "@/components/form/date-time-input";
import type { FieldProps } from "@/components/form/types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type DateTimeFieldProps = ComponentProps<typeof DateTimeInput> & FieldProps;

export function DateTimeField({ label, ...props }: DateTimeFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
      <DateTimeInput {...props} />
      {/* TODO missing errors */}
      <FieldError />
    </Field>
  );
}
