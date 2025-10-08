"use client";

import { FormDevtools } from "@tanstack/react-form-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function Devtools() {
  return (
    <>
      <ReactQueryDevtools />
      <FormDevtools />
    </>
  );
}
