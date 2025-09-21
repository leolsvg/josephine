import type { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function ExceptionsCard() {
  const t: DateRange | undefined = undefined;
  return (
    <Card className="w-100">
      <CardHeader>
        <CardTitle>Exceptions</CardTitle>
        <CardAction>
          <Dialog>
            <DialogTrigger>
              <Button>Ajouter</Button>
            </DialogTrigger>
            <DialogContent>
              <DateRangePicker selected={t} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Coucou</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
