"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/lib/trpc/react";
import { FooterSectionContent, FooterSectionTitle } from "./footer-section";

export function ScheduleSection() {
  return (
    <section>
      <FooterSectionTitle>Horaires</FooterSectionTitle>
      <FooterSectionContent>
        <Schedule />
      </FooterSectionContent>
    </section>
  );
}

function Schedule() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.places.get.queryOptions());
  if (!data) return;
  return (
    <ul className="text-sm">
      {data.regularOpeningHours.weekdayDescriptions.map((d) => (
        <li key={d}>{d}</li>
      ))}
    </ul>
  );
}
