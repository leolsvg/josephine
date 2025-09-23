import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import {
  bookingFormOptions,
  withBookingForm,
} from "@/components/form/use-booking-form";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export const SuccessState = withBookingForm({
  ...bookingFormOptions,
  props: {
    reset: (() => false) as () => void,
  },
  render: ({ form, reset }) => (
    <form.Subscribe
      selector={({ values }) => ({ email: values.email, name: values.name })}
    >
      {({ email, name }) => (
        <motion.div
          className="px-2"
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
              <CheckCircle className="mx-auto my-5 size-16 text-green-700" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Merci, {name} !</h3>
              <p className="text-muted-foreground">
                Votre table est réservée. Vous allez recevoir un mail de
                confirmation à {email}.
              </p>
            </div>
            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={() => {
                  form.reset();
                  reset();
                }}
              >
                Fermer
              </Button>
            </DialogClose>
          </div>
        </motion.div>
      )}
    </form.Subscribe>
  ),
});
