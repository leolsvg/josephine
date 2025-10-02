import type { Table } from "@tanstack/react-table";
import { SearchInput } from "@/components/form/search-input";
import type { TBooking } from "@/server/db/types";
import { PutBookingDialog } from "../mutate/put-booking-dialog";
import { ColumnVisibilitySelect } from "./column-visibility-select";

interface DataTableHeaderProps {
  title?: string;
  onSearch: (search: string) => void;
  globalFilter: string;
  table: Table<TBooking>;
}

export function BookingsHeader({
  title,
  onSearch,
  globalFilter,
  table,
}: DataTableHeaderProps) {
  return (
    <div className="flex pb-3 md:items-center gap-3 flex-col md:flex-row">
      <div className="grow text-lg md:text-2xl whitespace-nowrap font-semibold">
        {title}
      </div>
      <div className="flex items-center gap-3">
        <ColumnVisibilitySelect table={table} />
        <SearchInput
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
