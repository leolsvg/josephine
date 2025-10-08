import { createFormHook } from "@tanstack/react-form";
import { TextField } from "@/components/form/fields/text-field";
import { SubmitButton } from "@/components/form/submit-button";
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
