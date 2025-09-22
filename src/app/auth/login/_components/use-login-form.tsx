import { createFormHook } from "@tanstack/react-form";
import { SubmitButton } from "@/components/form/submit-button";
import { TextField } from "@/components/form/text-field";
import { fieldContext, formContext } from "@/components/form/types";

export const { useAppForm: useLoginForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
