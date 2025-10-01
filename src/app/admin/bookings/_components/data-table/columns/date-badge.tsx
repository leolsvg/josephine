import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DateBadge({ date }: { date: string }) {
  return (
    <Badge
      className="flex gap-2 items-center text-base [&>svg]:size-4"
      variant="secondary"
    >
      <Calendar />
      <span>{date}</span>
    </Badge>
  );
}
