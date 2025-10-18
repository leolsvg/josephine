import { Empty, EmptyHeader, EmptyMedia } from "./ui/empty";
import { Spinner } from "./ui/spinner";

export function PendingData() {
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
