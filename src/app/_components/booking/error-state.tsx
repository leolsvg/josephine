import type { TRPCClientErrorLike } from "@trpc/client";
import { CircleAlert } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AppRouter } from "@/server/routers";

export function ErrorState({
  reset,
  error,
}: {
  reset: () => void;
  error: TRPCClientErrorLike<AppRouter> | null;
}) {
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Une erreur est survenue</DialogTitle>
        <DialogDescription>{error?.message}</DialogDescription>
      </DialogHeader>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <CircleAlert className="mx-auto my-5 size-16 text-destructive" />
          </motion.div>
          <p className="text-muted-foreground">{error?.message}</p>
          <Button onClick={() => reset()}>Réssayer</Button>
        </div>
      </motion.div>
    </div>
  );
}
