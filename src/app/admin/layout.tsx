import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/feat/booking/components/admin/header";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <div className="flex h-screen flex-col">
          <Header />
          <main className="grow overflow-auto p-5">{children}</main>
        </div>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
