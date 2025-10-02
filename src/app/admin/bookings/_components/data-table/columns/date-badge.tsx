import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateFormat } from "@/lib/utils/date";

export function DateBadge({ date }: { date: Temporal.PlainDate }) {
  return (
    <Badge
      className="flex gap-2 items-center text-base [&>svg]:size-4"
      variant="secondary"
    >
      <Calendar />
      <span>{DateFormat.format(date)}</span>
    </Badge>
  );
}
