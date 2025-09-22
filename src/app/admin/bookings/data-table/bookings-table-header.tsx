import { Input } from "@/components/ui/input";
import { PutBookingDialog } from "../mutate/put-booking-dialog";

interface DataTableHeaderProps {
  title?: string;
  onSearch: (search: string) => void;
  globalFilter: string;
}

export function DataTableHeader({
  title,
  onSearch,
  globalFilter,
}: DataTableHeaderProps) {
  return (
    <div className="flex pb-3 items-centers gap-3">
      <div className="grow text-2xl whitespace-nowrap font-semibold">
        {title}
      </div>
      <Input
        type="text"
        placeholder="Recherche"
        value={globalFilter}
        onChange={(e) => onSearch(e.target.value)}
        className="w-auto md:w-64"
      />
      <PutBookingDialog />
    </div>
  );
}
