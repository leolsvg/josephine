"use client";

import { useFieldContext } from "./types";

export function FieldErrors() {
  const field = useFieldContext();
  return (
    !field.state.meta.isValid && (
      <div className="flex flex-col">
        {field.state.meta.errors.map((e) => (
          <em className="text-destructive text-sm" key={e.message}>
            {e.message}
          </em>
        ))}
      </div>
    )
  );
}
