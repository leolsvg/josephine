"use client";

import z from "zod";
import { useAppForm } from "@/components/form/use-app-form";
import { useSignIn } from "./use-sign-in";

const SLogin = z.object({
  email: z.email("Adresse mail invalide."),
  password: z.string().min(1, "Merci de saisir votre mot de passe."),
});

export type TLogin = z.infer<typeof SLogin>;

const defaultValues: TLogin = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const { mutate, isPending } = useSignIn();
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: SLogin,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
    },
  });
  return { form, isPending };
}
