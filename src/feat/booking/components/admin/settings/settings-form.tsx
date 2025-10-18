"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/use-app-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MAX_GUESTS, MIN_GUESTS } from "@/feat/booking/utils/booking-schema";
import { SSettings } from "@/feat/booking/utils/settings-schema";
import { useTRPC } from "@/lib/trpc/react";

export function SettingsForm() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.settings.get.queryOptions());
  const { mutate, isPending } = useMutation(
    trpc.settings.patch.mutationOptions({
      onSuccess: () => toast.success("Paramètres mis à jour"),
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useAppForm({
    defaultValues: data,
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: {
      onSubmit: SSettings,
    },
  });
  return (
    <form
      id="settings-form"
      className="space-y-4"
      autoComplete="on"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField name="maxGuestsPerBooking">
        {(field) => (
          <field.NumberField
            id="maxGuestsPerBooking"
            label="Nombre maximum d'invités pour une réservation"
            min={MIN_GUESTS}
            max={MAX_GUESTS}
          />
        )}
      </form.AppField>
      <form.AppField name="maxCapacityPerSlot">
        {(field) => (
          <field.NumberField
            id="maxCapacityPerSlot"
            label=" Capacité maximum par créneau (pas développé)"
          />
        )}
      </form.AppField>
      <form.AppField name="maxCapacityPerService">
        {(field) => (
          <field.NumberField
            id="maxCapacityPerSlot"
            label=" Capacité maximum par service"
          />
        )}
      </form.AppField>
      <form.AppField name="bookingEnabled">
        {(field) => (
          <Field>
            <FieldLabel>Réservations en ligne</FieldLabel>
            <RadioGroup
              className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
              onValueChange={(v) => field.handleChange(v === "true")}
              defaultValue={field.state.value ? "true" : "false"}
            >
              <FieldLabel htmlFor="enable-bookings">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Activer les réservations</FieldTitle>
                    <FieldDescription>
                      Les clients peuvent réserver à tout moment.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="true" id="enable-bookings" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="disable-bookings">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Désactiver les réservations</FieldTitle>
                    <FieldDescription>
                      <div className="flex items-center gap-2 text-warning">
                        <TriangleAlert className="size-4 shrink-0" />
                        <span>Suspend les réservations en ligne</span>
                      </div>
                      <span>
                        Seules les réservations admin restent possibles.
                      </span>
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="false" id="disable-bookings" />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </Field>
        )}
      </form.AppField>
      <form.AppForm>
        <form.SubmitButton isPending={isPending}>Sauvegarder</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
