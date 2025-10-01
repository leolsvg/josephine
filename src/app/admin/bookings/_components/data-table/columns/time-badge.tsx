import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TimeBadge({ time }: { time: Temporal.PlainTime }) {
  return (
    <Badge
      className="flex gap-2 items-center text-base [&>svg]:size-4"
      variant="default"
    >
      <Clock />
      <span>
        {time.toString({
          smallestUnit: "minute",
        })}
      </span>
    </Badge>
  );
}
