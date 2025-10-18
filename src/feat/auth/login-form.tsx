"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLoginForm } from "./use-login-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { form, isPending } = useLoginForm();

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
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
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
        </CardContent>
      </Card>
    </div>
  );
}
