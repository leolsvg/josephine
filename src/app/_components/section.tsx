import type { ReactNode } from "react";

export function Section({ children, id }: { children: ReactNode; id: string }) {
  return (
    <section
      className="flex flex-col gap-20 justify-center items-center scroll-mt-30 px-3"
      id={id}
    >
      {children}
    </section>
  );
}
