"use-client";

import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTRPC } from "@/lib/trpc/react";

export function DeleteBookingButton({ id }: { id: number }) {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.delete.mutationOptions(),
  );
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        mutate({ id });
      }}
    >
      {isPending && <Spinner />}
      <Trash className="stroke-destructive" />
    </Button>
  );
}
