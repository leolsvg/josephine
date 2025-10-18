import { formOptions } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useAppForm } from "@/components/form/use-app-form";
import { useTRPC } from "@/lib/trpc/react";
import type { TBooking } from "../db/types";
import { SBooking } from "../utils/booking-schema";

export const defaultBooking: Partial<TBooking> = {
  date: undefined,
  time: undefined,
  email: undefined,
  name: undefined,
  guests: undefined,
  phone: undefined,
  notes: undefined,
};

export const bookingFormOptions = formOptions({
  defaultValues: defaultBooking,
});

export function useBookingForm() {
  const trpc = useTRPC();
  const { mutate, status, reset, error } = useMutation(
    trpc.bookings.book.mutationOptions(),
  );
  const form = useAppForm({
    ...bookingFormOptions,
    validators: {
      onSubmit: SBooking,
    },
    onSubmit: async ({ value }) => {
      mutate(SBooking.parse(value));
    },
  });
  return { form, status, reset, error };
}
