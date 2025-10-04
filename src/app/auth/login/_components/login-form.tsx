"use client";

import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { scopes } from "@/lib/google";
import { supabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useLoginForm } from "./use-login-form";

const SLogin = z.object({
  email: z.email("Adresse mail invalide."),
  password: z.string().min(1, "Merci de saisir votre mot de passe."),
});

export type TLogin = z.infer<typeof SLogin>;

const defaultValues: TLogin = {
  email: "",
  password: "",
};

function useGoogleAuth() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: scopes.join(" "),
          redirectTo: "http://localhost:3000/auth/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      console.log(data);
      localStorage.setItem("test", JSON.stringify(data));
      if (error) throw error;
    },
    onSuccess: () => router.push("/admin/bookings"),
    onError: (e) => {
      if (e instanceof AuthError && e.code === "invalid_credentials")
        return toast.error("Email ou mot de passe invalide.");
      if (e instanceof Error) {
        return toast.error(`Une erreur est survenue : ${e.message}.`);
      }
      return toast.error(`Une erreur inconnue est survenue.`);
    },
  });
}

function useAuth() {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password }: TLogin) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    onSuccess: () => router.push("/admin/bookings"),
    onError: (e) => {
      if (e instanceof AuthError && e.code === "invalid_credentials")
        return toast.error("Email ou mot de passe invalide.");
      if (e instanceof Error) {
        return toast.error(`Une erreur est survenue : ${e.message}.`);
      }
      return toast.error(`Une erreur inconnue est survenue.`);
    },
  });
}

function GoogleButton() {
  const { mutate, isPending } = useGoogleAuth();
  return (
    <Button disabled={isPending} onClick={() => mutate()}>
      Google
    </Button>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate, isPending } = useAuth();
  const form = useLoginForm({
    defaultValues,
    validators: {
      onSubmit: SLogin,
    },
    onSubmit: async ({ value }) => {
      mutate(value);
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
                <form.SubmitButton isPending={isPending}>
                  Login
                </form.SubmitButton>
              </form.AppForm>
            </div>
          </form>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
}
