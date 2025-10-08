"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export function Devtools() {
  return (
    <TanStackDevtools
      plugins={[
        {
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel />,
        },
        FormDevtoolsPlugin(),
      ]}
    />
  );
}
