import type { ComponentProps, ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type CardRadioProps = {
  title: string;
  children: ReactNode;
} & ComponentProps<typeof RadioGroupItem>;

export function RadioCard({ id, title, children, ...props }: CardRadioProps) {
  return (
    <Label className="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/20 flex items-start justify-between gap-3 rounded-lg border p-3">
      <div className="grid gap-1 font-normal">
        <div className="font-medium mb-1">{title}</div>
        <div className="text-muted-foreground text-xs leading-snug text-balance">
          {children}
        </div>
      </div>
      <RadioGroupItem
        {...props}
        className="data-[state=checked]:border-primary"
      />
    </Label>
  );
}
