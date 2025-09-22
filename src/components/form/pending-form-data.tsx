import { Loader2 } from "lucide-react";

export function PendingFormData() {
  return (
    <div className="min-h-100 text-center flex flex-col gap-3 items-center justify-center">
      <Loader2 className="animate-spin" />
      <span>Chargement ...</span>
    </div>
  );
}
