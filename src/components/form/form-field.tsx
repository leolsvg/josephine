import type { ReactNode } from "react";

export function FormField({ children }: { children: ReactNode }) {
  return <div className="grid w-full items-center">{children}</div>;
}
