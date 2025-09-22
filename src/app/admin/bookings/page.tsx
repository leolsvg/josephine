import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { columns } from "./data-table/bookings-columns";
import { DataTable } from "./data-table/bookings-table";
import { Sidebar } from "./sidebar";

export default async function BookingsPage() {
  return (
    <div className="flex gap-3">
      <Sidebar />
      <Suspense
        fallback={
          <Card className="py-0 overflow-hidden grow">
            <Table className="h-full" noWrapper>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">Chargement ...</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        }
      >
        <DataTable className="grow" columns={columns} />
      </Suspense>
    </div>
  );
}
