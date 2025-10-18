import SuperJSON from "superjson";
import "temporal-polyfill/global";

SuperJSON.registerCustom<Temporal.PlainDate, string>(
  {
    isApplicable: (v): v is Temporal.PlainDate =>
      v instanceof Temporal.PlainDate,
    serialize: (v) => v.toJSON(),
    deserialize: (v) => Temporal.PlainDate.from(v),
  },
  "Temporal.PlainDate",
);

SuperJSON.registerCustom<Temporal.PlainTime, string>(
  {
    isApplicable: (v): v is Temporal.PlainTime =>
      v instanceof Temporal.PlainTime,
    serialize: (v) => v.toJSON(),
    deserialize: (v) => Temporal.PlainTime.from(v),
  },
  "Temporal.PlainTime",
);

export default SuperJSON;
