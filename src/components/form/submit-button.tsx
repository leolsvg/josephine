"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useFormContext } from "./types";

type SubmitButtonProps = ComponentProps<typeof Button> & {
  isPending?: boolean;
};
export function SubmitButton({
  children,
  isPending,
  className,
  ...props
}: SubmitButtonProps) {
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
          {...props}
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
