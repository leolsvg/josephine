import { Button } from "./ui/button";

export function EmailLink({ email }: { email: string }) {
  return (
    <Button variant="link" size="sm" asChild>
      <a href={`mailto:${email}`}>{email}</a>
    </Button>
  );
}
