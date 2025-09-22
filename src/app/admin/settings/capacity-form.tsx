"use client";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { MAX_GUESTS, MIN_GUESTS } from "@/components/booking/booking-schema";
import { useSettingsForm } from "@/components/form/use-settings-form";
import { useTRPC } from "@/lib/trpc/react";
import { SSettings } from "@/server/db/types";

export function CapacityForm() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.settings.get.queryOptions());
  const { mutate, isPending } = useMutation(
    trpc.settings.patch.mutationOptions({
      onSuccess: () => toast.success("Paramètres mis à jour"),
      onError: (e) => toast.error(e.message),
    }),
  );
  const form = useSettingsForm({
    defaultValues: data,
    onSubmit: ({ value }) => {
      mutate(value);
    },
    validators: {
      onSubmit: SSettings.omit({
        maxGuestsPerBooking: true,
      }).extend({
        maxGuestsPerBooking: z
          .number({
            error:
              "Merci d'indiquer le nombre maximum d'invités pour une réservation.",
          })
          .min(
            MIN_GUESTS,
            "Le nombre maximum d'invités pour une réservation doit être supérieur à 1.",
          )
          .max(
            MAX_GUESTS,
            `Le nombre maximum d'invités pour une réservation ne peux pas dépasser ${MAX_GUESTS} personnes.`,
          ),
      }),
    },
  });
  return (
    <form
      className="space-y-4"
      autoComplete="on"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
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
            label=" Capacité maximum par créneau"
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
      <form.AppForm>
        <form.SubmitButton isPending={isPending}>Sauvegarder</form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
