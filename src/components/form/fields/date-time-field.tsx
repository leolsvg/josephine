import type { ComponentProps } from "react";
import { DateTimeInput } from "@/components/form/date-time-input";
import type { FieldProps } from "@/components/form/types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type DateTimeFieldProps = ComponentProps<typeof DateTimeInput> &
  FieldProps & {
    isInvalid: boolean;
    errors: undefined[];
  };

export function DateTimeField({
  label,
  errors,
  isInvalid,
  ...props
}: DateTimeFieldProps) {
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={props.id}>{label}</FieldLabel>
      <DateTimeInput aria-invalid={isInvalid} {...props} />
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  );
}
