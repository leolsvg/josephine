import { env } from "./env";
import { TIMEZONE } from "./utils/date";

export const Josephine = {
  name: "Joséphine",
  address: "12 Place de la République, 50100 Cherbourg, France",
  phone: "+33 2 33 87 31 64",
  email: `contact@${env.NEXT_PUBLIC_DOMAIN}`,
  website: `https://www.${env.NEXT_PUBLIC_DOMAIN}/`,
  socials: {
    instagram: "https://www.instagram.com/josephine_cherbourg/",
    google: "https://share.google/1ZJew6hmdhpNmNvTI",
  },
  timezone: TIMEZONE,
  logoUrl: `https://${env.NEXT_PUBLIC_DOMAIN}/favicon/android-chrome-192x192.png`,
  heroUrl: `https://${env.NEXT_PUBLIC_DOMAIN}/restaurant/bar.jpeg`,
  mapsUrl: "https://maps.app.goo.gl/AW8EGJAZfBkc57nGA",
  noreply: `no-reply@${env.NEXT_PUBLIC_DOMAIN}`,
};
