"use client";

import { motion } from "framer-motion";
import { CheckCircle, CircleAlert } from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type IconType = "success" | "error" | "pending";

export function FormState({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-live="polite"
      className="px-4 pt-6 flex flex-col items-center text-center gap-4"
    >
      {children}
    </motion.div>
  );
}

export function FormStateIcon({ type }: { type: IconType }) {
  const icon =
    type === "success" ? (
      <CheckCircle className="size-12 text-green-600 dark:text-green-400" />
    ) : type === "error" ? (
      <CircleAlert className="size-12 text-destructive" />
    ) : (
      <Spinner className="size-12" />
    );

  const bg =
    type === "success"
      ? "bg-green-100 dark:bg-green-900/30"
      : type === "error"
        ? "bg-red-100 dark:bg-red-900/30"
        : "bg-primary/10 dark:bg-primary/20";

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 180,
        damping: 12,
      }}
    >
      <div className={cn("rounded-full p-4", bg)}>{icon}</div>
    </motion.div>
  );
}

interface FormStateContentProps {
  title: string;
  description?: string;
}

export function FormStateContent({
  title,
  description,
}: FormStateContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.3 }}
      className="flex flex-col items-center "
    >
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-center">
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription className="text-muted-foreground">
            {description}
          </DialogDescription>
        )}
      </DialogHeader>
    </motion.div>
  );
}

export function FormStateProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="mx-auto w-full max-w-sm"
    >
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full w-1/3 bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

export function FormStateErrors({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.3 }}
      className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm space-y-1 w-full"
    >
      {errors.map((e) => (
        <div key={e}>{e}</div>
      ))}
    </motion.div>
  );
}

export function FormStateActions({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
