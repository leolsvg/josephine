"use client";

import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { useFormContext } from "./types";

export function SubmitButton({
  children,
  isPending,
}: {
  children: ReactNode;
  isPending?: boolean;
}) {
  const context = useFormContext();
  return (
    <context.Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
      {({ canSubmit }) => (
        <Button
          className="w-full"
          type="submit"
          aria-disabled={!canSubmit || isPending}
          disabled={!canSubmit || isPending}
          onClick={() => context.handleSubmit()}
        >
          {isPending ? "Chargement" : children}
        </Button>
      )}
    </context.Subscribe>
  );
}
