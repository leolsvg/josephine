import { X } from "lucide-react";
import type { ChangeEvent, ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchInput({
  value,
  onChange,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <div className="relative">
      <Input type="search" value={value} onChange={onChange} {...props} />
      {value && onChange && (
        <Button
          type="button"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 p-3 size-4"
          onClick={() =>
            onChange({
              target: { value: "" },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
}
