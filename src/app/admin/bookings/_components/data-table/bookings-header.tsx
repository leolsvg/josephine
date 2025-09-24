import { Input } from "@/components/ui/input";
import { PutBookingDialog } from "../mutate/put-booking-dialog";

interface DataTableHeaderProps {
  title?: string;
  onSearch: (search: string) => void;
  globalFilter: string;
}

export function BookingsHeader({
  title,
  onSearch,
  globalFilter,
}: DataTableHeaderProps) {
  return (
    <div className="flex pb-3 md:items-center gap-3 flex-col md:flex-row">
      <div className="grow text-lg md:text-2xl whitespace-nowrap font-semibold">
        {title}
      </div>
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Recherche"
          value={globalFilter}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full md:w-64"
        />
        <PutBookingDialog />
      </div>
    </div>
  );
}
