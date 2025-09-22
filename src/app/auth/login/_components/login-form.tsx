"use client";

import { useRouter } from "next/navigation";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useLoginForm } from "./use-login-form";

const SLogin = z.object({
  email: z.email("Adresse mail invalide"),
  password: z.string().min(1, "Merci de saisir votre mot de passe"),
});

export type TLogin = z.infer<typeof SLogin>;

const defaultValues: TLogin = {
  email: "",
  password: "",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useLoginForm({
    defaultValues,
    validators: {
      onSubmit: SLogin,
    },
    onSubmit: async ({ value: { email, password } }) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/admin/bookings");
      } catch {}
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-6">
              <form.AppField name="email">
                {(f) => (
                  <f.TextField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="m@example.com"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                )}
              </form.AppField>
              <form.AppField name="password">
                {(f) => (
                  <f.TextField
                    id="password"
                    label="Mot de passe"
                    type="password"
                    value={f.state.value}
                    onChange={(e) => f.handleChange(e.target.value)}
                  />
                )}
              </form.AppField>
              <form.AppForm>
                <form.SubmitButton>
                  {form.state.isSubmitting ? "Logging in..." : "Login"}
                </form.SubmitButton>
              </form.AppForm>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
