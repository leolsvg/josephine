import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/lib/trpc/react";

export function DeleteBookingButton({ id }: { id: number }) {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.delete.mutationOptions(),
  );
  return (
    <Button
      className=""
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        mutate({ id });
      }}
    >
      {isPending && <Loader2 className="animate-spin" />}
      <Trash className="stroke-destructive" />
    </Button>
  );
}
