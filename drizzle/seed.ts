import "temporal-polyfill/global";
import { faker } from "@faker-js/faker";
import { db } from "@/server/db";
import {
  bookingsTable,
  exceptionsTable,
  menusTable,
  weeklyTable,
} from "@/server/db/schema"; // adjust import path if needed

async function main() {
  console.log("🧹 Clearing tables...");
  await db.delete(bookingsTable);
  await db.delete(menusTable);

  await insertSchedule();
  await insertBookings();

  console.log("✅ Seed completed!");
}

main().catch((err) => {
  console.error("❌ Error seeding:", err);
  process.exit(1);
});

async function insertSchedule() {
  console.log("🌱 Seeding booking periods...");
  await db.insert(weeklyTable).values([
    {
      day: 2,
      start: Temporal.PlainTime.from("12:00:00"),
      end: Temporal.PlainTime.from("14:00:00"),
    },
    {
      day: 3,
      start: Temporal.PlainTime.from("12:00:00"),
      end: Temporal.PlainTime.from("14:00:00"),
    },
    {
      day: 4,
      start: Temporal.PlainTime.from("12:00:00"),
      end: Temporal.PlainTime.from("14:00:00"),
    },
    {
      day: 5,
      start: Temporal.PlainTime.from("12:00:00"),
      end: Temporal.PlainTime.from("14:00:00"),
    },
    {
      day: 2,
      start: Temporal.PlainTime.from("19:00:00"),
      end: Temporal.PlainTime.from("21:00:00"),
    },
    {
      day: 3,
      start: Temporal.PlainTime.from("19:00:00"),
      end: Temporal.PlainTime.from("21:00:00"),
    },
    {
      day: 4,
      start: Temporal.PlainTime.from("19:00:00"),
      end: Temporal.PlainTime.from("21:00:00"),
    },
    {
      day: 5,
      start: Temporal.PlainTime.from("19:00:00"),
      end: Temporal.PlainTime.from("21:30:00"),
    },
    {
      day: 6,
      start: Temporal.PlainTime.from("19:00:00"),
      end: Temporal.PlainTime.from("21:30:00"),
    },
  ]);

  await db.insert(exceptionsTable).values([
    {
      from: Temporal.PlainDate.from(
        faker.date.soon({ days: 14 }).toDateString(),
      ),
    },
  ]);
}

function randomTime() {
  const hour = faker.number.int({
    min: 12,
    max: 14,
  });
  const minute = faker.helpers.arrayElement([0, 15, 30, 45]);
  return Temporal.PlainTime.from(
    `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
  );
}

async function insertBookings() {
  await db.insert(bookingsTable).values(
    Array.from({ length: 400 }).map(() => {
      const date = faker.date.soon({ days: 14 }); // within next 2 weeks
      return {
        date: Temporal.PlainDate.from(date.toDateString()),
        time: randomTime(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        guests: faker.number.int({ min: 1, max: 5 }),
        notes: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([
          "pending",
          "canceled",
          "present",
          "absent",
        ]),
      };
    }),
  );
}
