"use client";

import { useAppForm } from "@/components/form/use-app-form";
import { SLogin, type TLogin, useSignIn } from "@/lib/auth/use-sign-in";

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
