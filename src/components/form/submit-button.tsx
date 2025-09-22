"use client";

import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { useFormContext } from "./types";

export function SubmitButton({ children }: { children: ReactNode }) {
  const context = useFormContext();
  return (
    <context.Subscribe
      selector={({ isSubmitting, canSubmit }) => ({ isSubmitting, canSubmit })}
    >
      {({ isSubmitting, canSubmit }) => (
        <Button
          className="w-full"
          type="submit"
          aria-disabled={isSubmitting}
          disabled={!canSubmit}
          onClick={() => context.handleSubmit()}
        >
          {isSubmitting ? "Chargement" : children}
        </Button>
      )}
    </context.Subscribe>
  );
}
