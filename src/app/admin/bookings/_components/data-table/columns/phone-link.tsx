import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Button } from "@/components/ui/button";

export function PhoneLink({ phone }: { phone: string }) {
  const formattedPhone = formatPhoneNumberIntl(phone);
  return (
    <Button variant="link" size="sm" asChild>
      <a href={`tel:${phone}`}>{formattedPhone}</a>
    </Button>
  );
}
