import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TimeBadge({ time }: { time: string }) {
  return (
    <Badge
      className="flex gap-2 items-center text-base [&>svg]:size-4"
      variant="default"
    >
      <Clock />
      <span>{time.slice(0, 5)}</span>
    </Badge>
  );
}
