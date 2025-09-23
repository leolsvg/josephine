import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Bookings } from "./data-table/bookings";
import { columns } from "./data-table/bookings-columns";
import { Sidebar } from "./sidebar";

export const dynamic = "force-dynamic";

export default function BookingsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center md:items-start">
      <Suspense>
        <Sidebar />
      </Suspense>
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
        <Bookings className="grow" columns={columns} />
      </Suspense>
    </div>
  );
}
