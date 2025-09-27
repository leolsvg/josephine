"use client";

import Image from "next/image";
import TableImage from "../../../../public/restaurant/table.jpeg";
import { wines } from "./wines";

export default function WinesPage() {
  return (
    <>
      <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen lg:fixed lg:right-0 lg:top-0">
        <Image
          src={TableImage}
          alt="Josephine Table"
          fill
          placeholder="blur"
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-16 lg:ml-0 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-black text-center lg:text-left">
          NOS VINS
        </h1>
        {wines.map((cat, idx) => (
          <section key={`${cat.title}-${idx}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">
              {cat.title}
            </h2>
            {cat.subtitle && (
              <p className="mt-5 mb-4 italic text-gray-700">{cat.subtitle}</p>
            )}
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li
                  key={item.name + item.price}
                  className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                >
                  <p className="font-medium">{item.name}</p>
                  <span className="font-semibold">{item.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
