"use client";

import Image from "next/image";
import TableWindowImage from "../../../../public/restaurant/table-window.jpeg";
import { spirits } from "./spirits";

export default function SpiritsPage() {
  return (
    <>
      <div className="hidden lg:block w-full lg:w-1/2 h-64 lg:h-screen lg:fixed lg:right-0 lg:top-0">
        <Image
          src={TableWindowImage}
          alt="Josephine Table Fenêtre"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="w-full lg:w-1/2 px-6 sm:px-8 py-20 space-y-20 lg:ml-0 lg:mr-auto">
        <h1 className="text-[32px] sm:text-[42px] lg:text-[46px] mb-10 text-[#000000] text-center lg:text-left">
          NOS SPIRITUEUX
        </h1>
        {spirits.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#000000]">
              {cat.title}
            </h2>
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li
                  key={item.name}
                  className="flex justify-between border-b pb-2 text-black text-sm sm:text-base"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-gray-600">
                        {item.description}
                      </p>
                    )}
                  </div>
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
