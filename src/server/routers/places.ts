import { fromPromise } from "neverthrow";
import z from "zod";
import { env } from "@/lib/env";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/init";

const placeId = "ChIJnWCt-BOXDEgRJGZkI3YSAys";

const fields = ["displayName.text", "regularOpeningHours", "reviews", "photos"];

export type Review = {
  rating: number;
  googleMapsUri: string;
  authorAttribution: { displayName: string; photoUri: string };
  relativePublishTimeDescription: string;
  originalText: { text: string };
};

export type Period = {
  open: { day: number; hour: number; minute: number };
  close: { day: number; hour: number; minute: number };
};

export type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: { displayName: string; uri: string; photoUri: string }[];
  flagContentUri: string;
  googleMapsUri: string;
};

export type Place = {
  reviews: Review[];
  regularOpeningHours: {
    periods: Period[];
    weekdayDescriptions: string[];
  };
  photos: Photo[];
};

async function getPlace() {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?fields=${fields.join(",")}&languageCode=fr&regionCode=fr&key=${env.GOOGLE_MAPS_API_KEY}`,
  );
  return (await res.json()) as Place;
}

async function getMedia(name: string) {
  const res = await fetch(
    `https://places.googleapis.com/v1/${name}/media?maxWidthPx=300&key=${env.GOOGLE_MAPS_API_KEY}`,
  );
  const blob = await res.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  const mime = blob.type || "image/jpeg";
  return `data:${mime};base64,${base64}`;
}

export const places = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const res = await fromPromise(getPlace(), (e) => e);
    return res.unwrapOr(undefined);
  }),
  getMedia: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const res = await fromPromise(getMedia(input.name), (e) => e);
      return res.unwrapOr(undefined);
    }),
});
