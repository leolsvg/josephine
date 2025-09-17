import type { Exceptions, Weekly } from "./utils";

export const weekly: Weekly = [
  null, // Sunday - closed
  null, // Monday
  {
    periods: [
      { from: "12:00", to: "14:00" },
      { from: "19:00", to: "21:00" },
    ],
  }, // Tuesday
  {
    periods: [
      { from: "12:00", to: "14:00" },
      { from: "19:00", to: "21:00" },
    ],
  }, // Wednesday
  {
    periods: [
      { from: "12:00", to: "14:00" },
      { from: "19:00", to: "21:00" },
    ],
  }, // Thursday
  {
    periods: [
      { from: "12:00", to: "14:00" },
      { from: "19:00", to: "21:30" },
    ],
  }, // Friday
  {
    periods: [{ from: "19:00", to: "21:30" }],
  }, // Saturday
];

export const exceptions: Exceptions = [
  {
    from: "2025-09-16",
    periods: [],
  },
  {
    from: "2025-09-17",
    periods: [
      { from: "07:00", to: "09:00" },
      { from: "16:00", to: "18:00" },
    ],
  },
  {
    from: "2025-10-08",
    to: "2025-10-15",
    periods: [{ from: "22:00", to: "23:00" }],
  },
  {
    from: "2025-10-20",
    to: "2025-10-25",
    periods: [],
  },
];
