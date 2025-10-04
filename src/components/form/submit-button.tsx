"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useFormContext } from "./types";

export function SubmitButton({
  children,
  isPending,
  className,
}: {
  children: ReactNode;
  isPending?: boolean;
  className?: string;
}) {
  const context = useFormContext();
  return (
    <context.Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
      {({ canSubmit }) => (
        <Button
          className={cn("w-full", className)}
          type="submit"
          aria-disabled={!canSubmit || isPending}
          disabled={!canSubmit || isPending}
          onClick={() => context.handleSubmit()}
        >
          {isPending ? (
            <>
              <Spinner />
              Chargement
            </>
          ) : (
            children
          )}
        </Button>
      )}
    </context.Subscribe>
  );
}
