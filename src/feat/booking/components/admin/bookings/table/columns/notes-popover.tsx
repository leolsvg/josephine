import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NotesPopover({ notes }: { notes: string | null }) {
  if (!notes) return <span>Aucune</span>;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="py-1 px-2 text-middle max-w-full truncate overflow-ellipsis bg-accent rounded-md cursor-pointer">
          {notes}
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs sm:max-w-xl whitespace-pre-wrap break-words text-sm p-2">
        {notes}
      </PopoverContent>
    </Popover>
  );
}
