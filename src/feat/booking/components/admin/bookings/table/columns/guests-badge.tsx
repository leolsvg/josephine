import { ForkKnife } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function GuestsBadge({ guests }: { guests: number }) {
  return (
    <Badge
      className="flex gap-2 items-center text-base [&>svg]:size-4"
      variant="outline"
    >
      <ForkKnife />
      <span>{guests}</span>
    </Badge>
  );
}
