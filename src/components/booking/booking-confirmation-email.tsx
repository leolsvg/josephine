import {
  Link as BaseLink,
  Text as BaseText,
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
} from "@react-email/components";
import type { ComponentProps, ReactNode } from "react";
import { env } from "@/lib/env";
import { Josephine } from "@/lib/josephine";
import { FullDateTimeFormat } from "@/lib/utils/date";

function Link(props: ComponentProps<typeof BaseLink>) {
  return <BaseLink {...props} className="underline text-black" />;
}

function Text(props: ComponentProps<typeof BaseText>) {
  return <BaseText {...props} className="m-0" />;
}

function Card({ children }: { children: ReactNode }) {
  return (
    <Section className="rounded-xl bg-neutral-100 px-6 py-4 mt-8">
      {children}
    </Section>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return (
    <Section>
      {children}
      <Hr />
    </Section>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Heading
      as="h2"
      className="m-0 text-lg uppercase tracking-wider text-neutral-600 font-bold"
    >
      {children}
    </Heading>
  );
}

function CardFooter({ children }: { children: ReactNode }) {
  return (
    <Section>
      <Hr />
      {children}
    </Section>
  );
}

function CardContent({ children }: { children: ReactNode }) {
  return <Section className="text-sm">{children}</Section>;
}

type BookingConfirmationEmailProps = {
  name: string;
  email: string;
  date: Date;
  guests: number;
  phone: string;
  notes?: string;
};

export function BookingConfirmationEmail({
  name,
  email,
  date,
  guests,
  phone,
  notes,
}: BookingConfirmationEmailProps) {
  const formatDate = FullDateTimeFormat.format(date);
  return (
    <Html>
      <Tailwind>
        <Head>
          <Font
            fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            fallbackFontFamily="Arial"
          />
        </Head>
        <Preview>
          Confirmée • {formatDate} • {guests.toString()}{" "}
          {guests > 1 ? "couverts" : "couvert"}
        </Preview>

        <Body className="bg-neutral-200 p-5">
          <Container className="mx-auto bg-white shadow-sm rounded-2xl overflow-hidden">
            <Section className="py-6">
              <Img
                src={Josephine.logoUrl}
                alt={Josephine.name}
                width="48"
                height="48"
                className="mx-auto"
              />
            </Section>

            <Section>
              <Img
                src={Josephine.heroUrl}
                alt="Restaurant Joséphine"
                width={600}
                className="h-72 object-cover object-center"
              />
            </Section>
            <Section className="p-8">
              <Section>
                <Heading as="h1" className="text-2xl font-semibold mt-0">
                  Votre réservation est confirmée
                </Heading>
                <Text className="text-sm text-neutral-700">
                  Bonjour {name}, merci pour votre réservation chez{" "}
                  {Josephine.name}. Nous avons hâte de vous accueillir.
                </Text>
              </Section>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <Row>
                    <Column className="w-1/3">Date</Column>
                    <Column className="text-right">{formatDate}</Column>
                  </Row>
                  <Row>
                    <Column className="w-1/3">Nombre de couverts</Column>
                    <Column className="text-right">
                      {guests} {guests > 1 ? "personnes" : "personne"}
                    </Column>
                  </Row>
                  <Row>
                    <Column className="w-1/3">Email</Column>
                    <Column className="text-right">
                      <Link>{email}</Link>
                    </Column>
                  </Row>
                  <Row>
                    <Column className="w-1/3 ">Téléphone</Column>
                    <Column className="text-right">{phone}</Column>
                  </Row>
                </CardContent>
                {notes ? (
                  <CardFooter>
                    <Text className="text-sm text-neutral-600">
                      <span className="font-semibold">Notes :</span> {notes}
                    </Text>
                  </CardFooter>
                ) : null}
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Infos pratiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text>
                    Adresse :{" "}
                    <Link href={Josephine.mapsUrl} className="underline">
                      {Josephine.address}
                    </Link>
                  </Text>

                  <Text>
                    Téléphone :{" "}
                    <Link
                      href={`tel:${Josephine.phone}`}
                      className="underline "
                    >
                      {Josephine.phone}
                    </Link>
                  </Text>
                  <Text>
                    Email :{" "}
                    <Link
                      href={`mailto:${Josephine.email}`}
                      className="underline"
                    >
                      {Josephine.email}
                    </Link>
                  </Text>

                  <Text>
                    Site web :{" "}
                    <Link href={Josephine.website} className="underline">
                      {env.NEXT_PUBLIC_DOMAIN}
                    </Link>
                  </Text>
                </CardContent>
                <CardFooter>
                  <Text className="text-sm text-neutral-600">
                    Merci d'arriver à l'heure pour garantir la meilleure
                    expérience.
                  </Text>
                </CardFooter>
              </Card>
            </Section>
          </Container>
          <Section className="text-center">
            <Text className="text-xs text-neutral-500 mt-5">
              © {new Date().getFullYear()} {Josephine.name}. Tous droits
              réservés.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}
