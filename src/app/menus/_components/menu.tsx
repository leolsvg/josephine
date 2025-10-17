import type { ReactNode } from "react";
import { priceIntl } from "@/lib/utils";

export function MenuTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-6 text-black text-center lg:text-left">
      {children}
    </h1>
  );
}

export function Menu({ children }: { children: ReactNode }) {
  return (
    <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-10 lg:mr-auto">
      {children}
    </div>
  );
}

export function MenuImage({ children }: { children: ReactNode }) {
  return (
    <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen lg:fixed lg:right-0 lg:top-0">
      {children}
    </div>
  );
}

export function MenuSectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">
      {children}
    </h2>
  );
}

export function MenuSectionContent({ children }: { children: ReactNode }) {
  return <ul className="space-y-4">{children}</ul>;
}

export function MenuSectionItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex justify-between border-b pb-2 text-black text-sm sm:text-base">
      {children}
    </li>
  );
}

export function MenuSectionItemDescription({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="text-xs sm:text-sm text-gray-600">{children}</div>;
}

export function MenuPrice({ children }: { children?: number }) {
  if (!children)
    return <span className="text-gray-400 italic font-normal mx-3">-</span>;

  return <span className="font-semibold">{priceIntl.format(children)}</span>;
}
