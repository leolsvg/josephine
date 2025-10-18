"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type IconType = "success" | "error" | "pending";

export function BookingDialogRoot({ children }: { children: React.ReactNode }) {
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

const BookingDialogIconBgVariants = {
  error: "bg-red-100 dark:bg-red-900/30",
  pending: "bg-primary/10 dark:bg-primary/20",
  success: "bg-green-100 dark:bg-green-900/30",
};

export function BookingDialogIconBg({
  children,
  type,
}: {
  children: ReactNode;
  type: IconType;
}) {
  return (
    <div className={cn("rounded-full p-4", BookingDialogIconBgVariants[type])}>
      {children}
    </div>
  );
}

export function BookingDialogIcon({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        delay: 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 180,
        damping: 12,
      }}
    >
      {children}
    </motion.div>
  );
}

interface FormStateContentProps {
  title: string;
  children?: ReactNode;
}

export function BookingDialogContent({
  title,
  children,
}: FormStateContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-center">
          {title}
        </DialogTitle>
        {children && (
          <DialogDescription className="text-muted-foreground text-center">
            {children}
          </DialogDescription>
        )}
      </DialogHeader>
    </motion.div>
  );
}

export function BookingDialogProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
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

export function BookingDialogError({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.3, ease: "easeOut" }}
      className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm space-y-1 w-full"
    >
      {children}
    </motion.div>
  );
}

export function BookingDialogActions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
