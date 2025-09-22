import { Suspense } from "react";
import { AddMenuButton } from "./_components/add-menu-button";
import { MenuTable } from "./_components/menus-table";

export default function MenusPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Modifier la carte</h1>
      </div>

      <div className="mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du midi</h2>
          <AddMenuButton service="midi" />
        </div>
        <Suspense>
          <MenuTable service="midi" />
        </Suspense>
      </div>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <h2 className="text-xl font-semibold">Menu du soir</h2>
          <AddMenuButton service="soir" />
        </div>
        <Suspense>
          <MenuTable service="soir" />
        </Suspense>
      </div>
    </div>
  );
}
