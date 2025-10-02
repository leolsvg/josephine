"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
              <Loader2 className="animate-spin" />
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
