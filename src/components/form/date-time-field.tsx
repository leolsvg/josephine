import type { ComponentProps } from "react";
import { DateTimeInput } from "@/components/form/date-time-input";
import { FieldErrors } from "@/components/form/field-errors";
import { FormField } from "@/components/form/form-field";
import type { FieldProps } from "@/components/form/types";
import { Label } from "@/components/ui/label";

type DateTimeFieldProps = ComponentProps<typeof DateTimeInput> & FieldProps;

export function DateTimeField({ label, ...props }: DateTimeFieldProps) {
  return (
    <FormField>
      <Label className="mb-3" htmlFor={props.id}>
        {label}
      </Label>
      <DateTimeInput {...props} />
      <FieldErrors />
    </FormField>
  );
}
