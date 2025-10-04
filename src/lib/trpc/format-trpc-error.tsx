import type { TRPCClientErrorLike } from "@trpc/client";
import type { AppRouter } from "@/server/routers";

export function FormatTRPCError({
  error,
}: {
  error: TRPCClientErrorLike<AppRouter>;
}) {
  if (error.data?.zodError)
    return Object.values(error.data.zodError.fieldErrors).map((v) => (
      <ul key={crypto.randomUUID()} className="text-left">
        {v?.map((e) => (
          <li className="list-disc list-inside " key={e}>
            {e}
          </li>
        ))}
      </ul>
    ));
  if (error.shape?.message) {
    return error.shape.message;
  }
  return "Une erreur inconnue est survenue.";
}
