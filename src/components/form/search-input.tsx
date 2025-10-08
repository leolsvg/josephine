import { Search, X } from "lucide-react";
import type { ChangeEvent, ComponentProps } from "react";
import type { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

export function SearchInput({
  value,
  onChange,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <InputGroup>
      <InputGroupInput
        type="search"
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      {value && onChange && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() =>
              onChange({
                target: { value: "" },
              } as ChangeEvent<HTMLInputElement>)
            }
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
