import { Empty, EmptyHeader, EmptyMedia } from "../ui/empty";
import { Spinner } from "../ui/spinner";

export function PendingFormData() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
      </EmptyHeader>
    </Empty>
  );
}
