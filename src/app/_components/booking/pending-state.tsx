import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

export function Pending() {
  return (
    <motion.output
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-live="polite"
    >
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="my-5"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Loader2 className="mx-auto size-16 text-primary" />
          </motion.div>
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Traitement en cours…</h3>
          <p className="text-muted-foreground">
            Merci de patienter quelques secondes pendant que nous confirmons
            votre réservation.
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full w-1/3 bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </motion.output>
  );
}
