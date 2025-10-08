import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { type ReactNode, Suspense } from "react";
import { BookingDialog } from "../_components/booking/booking-dialog";

export type CategoryItem = {
  name: string;
  price: string;
  description?: string;
};

export type Category = {
  title: string;
  subtitle?: string;
  items: CategoryItem[];
};

export interface Dish {
  id: number;
  description: string;
  category: string;
  service: string;
  price: string;
}

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex flex-col lg:flex-row">
      <Link
        href="/#menu"
        className="fixed top-4 left-4 z-50 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
        aria-label="Retour à l'accueil"
      >
        <ChevronLeft />
      </Link>
      {children}
      <Suspense>
        <BookingDialog className="fixed bottom-4 right-4 z-50 rounded-full py-5" />
      </Suspense>
    </div>
  );
}
