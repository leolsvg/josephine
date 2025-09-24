import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Period } from "@/server/db/types";

export function SubTable({ periods }: { periods: Period[] }) {
  return (
    <Table>
      <TableBody>
        {periods.map((p) => (
          <TableRow key={p.start}>
            <TableCell>
              <Input type="time" defaultValue={p.start} />
            </TableCell>
            <TableCell>
              <Input type="time" defaultValue={p.end} />
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
