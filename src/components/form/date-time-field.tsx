import { DateTimeInput } from "@/components/form/date-time-input";
import { FieldErrors } from "@/components/form/field-errors";
import { FormField } from "@/components/form/form-field";
import type { FieldProps } from "@/components/form/types";
import { Label } from "@/components/ui/label";

type DateTimeFieldProps = {
  disabled: (date: Date) => boolean;
  timeSlots: (date: Date) => string[][];
  date: string | undefined;
  time: string | undefined;
  onDateChange: (date: string | undefined) => void;
  onTimeChange: (time: string | undefined) => void;
} & FieldProps;

export function DateTimeField({
  label,
  disabled,
  timeSlots,
  date,
  onDateChange,
  onTimeChange,
  time,
}: DateTimeFieldProps) {
  return (
    <FormField>
      <Label className="mb-3" htmlFor={label}>
        {label}
      </Label>
      <DateTimeInput
        id={label}
        disabled={disabled}
        timeSlots={timeSlots}
        date={date}
        time={time}
        onTimeChange={onTimeChange}
        onDateChange={onDateChange}
      />
      <FieldErrors />
    </FormField>
  );
}
