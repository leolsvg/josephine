import type { ReactNode } from "react";

export function FormDescription({ children }: { children: ReactNode }) {
  return <div className="text-muted-foreground text-sm">{children}</div>;
}
