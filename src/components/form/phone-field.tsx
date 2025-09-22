import type { ComponentProps } from "react";
import { FieldErrors } from "@/components/form/field-errors";
import { FormField } from "@/components/form/form-field";
import { type FieldProps, useFieldContext } from "@/components/form/types";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { PhoneInput } from "./phone-input";

type PhoneFieldProps = ComponentProps<typeof PhoneInput> & FieldProps;

export function PhoneField({
  label,
  id,
  className,
  ...props
}: PhoneFieldProps) {
  const field = useFieldContext<string>();
  return (
    <FormField>
      <Label className="mb-3" htmlFor={id}>
        {label}
      </Label>
      <PhoneInput
        {...props}
        className={cn("shadow-sm", className)}
        defaultCountry="FR"
        id={id}
        value={field.state.value}
        onChange={(v) => field.handleChange(v)}
        onBlur={field.handleBlur}
      />
      <FieldErrors />
    </FormField>
  );
}
