import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { TimeRange } from "@/feat/booking/db/types";

export function SubTable({ periods }: { periods: TimeRange[] }) {
  return (
    <Table>
      <TableBody>
        {periods.map((p) => (
          <TableRow key={p.start.toString()}>
            <TableCell>
              <Input type="time" defaultValue={p.start.toString()} />
            </TableCell>
            <TableCell>
              <Input type="time" defaultValue={p.end.toString()} />
            </TableCell>
            <TableCell className="w-0">
              {/* <Button variant="ghost" size="icon">
                <Trash className="size-4" />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
