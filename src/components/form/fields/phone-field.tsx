import type { ComponentProps } from "react";
import { type FieldProps, useFieldContext } from "@/components/form/types";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { PhoneInput } from "../phone-input";

type PhoneFieldProps = ComponentProps<typeof PhoneInput> & FieldProps;

export function PhoneField({ label, className, ...props }: PhoneFieldProps) {
  const { field, isInvalid } = useFieldContext<string>();
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <PhoneInput
        className={cn("shadow-sm", className)}
        defaultCountry="FR"
        id={field.name}
        name={field.name}
        aria-invalid={isInvalid}
        value={field.state.value}
        onChange={(v) => field.handleChange(v)}
        onBlur={field.handleBlur}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
