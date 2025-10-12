import { env } from "@/lib/env";
import { createTRPCRouter, publicProcedure } from "@/lib/trpc/init";

const placeId = "ChIJnWCt-BOXDEgRJGZkI3YSAys";

const fields = ["displayName.text", "regularOpeningHours", "reviews"];

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

export type Place = {
  reviews: Review[];
  regularOpeningHours: {
    periods: Period[];
    weekdayDescriptions: string[];
  };
};

export const places = createTRPCRouter({
  get: publicProcedure.query(async () => {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=${fields.join(",")}&languageCode=fr&regionCode=fr&key=${env.GOOGLE_MAPS_API_KEY}`,
    );
    const data = (await res.json()) as Place;
    return data;
  }),
});
