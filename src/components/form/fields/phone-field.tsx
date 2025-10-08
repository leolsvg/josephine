import type { ComponentProps } from "react";
import { type FieldProps, useFieldContext } from "@/components/form/types";
import { cn } from "@/lib/utils";
import { Field, FieldError, FieldLabel } from "../../ui/field";
import { PhoneInput } from "../phone-input";

type PhoneFieldProps = ComponentProps<typeof PhoneInput> & FieldProps;

export function PhoneField({
  label,
  id,
  className,
  ...props
}: PhoneFieldProps) {
  const field = useFieldContext<string>();
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <PhoneInput
        className={cn("shadow-sm", className)}
        defaultCountry="FR"
        id={id}
        value={field.state.value}
        onChange={(v) => field.handleChange(v)}
        onBlur={field.handleBlur}
        {...props}
      />
      <FieldError errors={field.state.meta.errors} />
    </Field>
  );
}
