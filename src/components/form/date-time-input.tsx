"use client";

import { CalendarIcon } from "lucide-react";
import { Fragment } from "react";
import { fr } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { FullDateFormat, TIMEZONE, toZdt } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function DateTimeInput({
  id,
  date,
  time,
  onDateChange,
  onTimeChange,
  disabled,
  timeSlots,
}: {
  id: string;
  date: string | undefined;
  time: string | undefined;
  onDateChange: (date: string | undefined) => void;
  onTimeChange: (time: string | undefined) => void;
  disabled: (date: Date) => boolean;
  timeSlots: (date: Date) => Temporal.PlainTime[][];
}) {
  const dateDate = date ? new Date(date) : undefined;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="shadow-sm flex justify-between"
          id={id}
        >
          {dateDate && time ? (
            <span>
              {FullDateFormat.format(dateDate)} à {timeFormat(time)}
            </span>
          ) : (
            <span className="text-muted-foreground">Séléctionner une date</span>
          )}
          <CalendarIcon className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-min p-0 gap-0" showCloseButton={false}>
        <DialogTitle className="sr-only">
          Choisir une date et une heure
        </DialogTitle>
        <DialogDescription className="sr-only">
          Choisissez la date et l'heure de votre réservation au restaurant.
        </DialogDescription>
        <div className="relative p-0 md:pr-48">
          <div className="flex items-center justify-center">
            <Calendar
              timeZone={TIMEZONE}
              locale={fr}
              mode="single"
              selected={dateDate}
              onSelect={(date) => {
                onDateChange(
                  date ? toZdt(date).toPlainDate().toString() : undefined,
                );
                onTimeChange(undefined);
              }}
              defaultMonth={dateDate}
              disabled={disabled}
              showOutsideDays={false}
              className="bg-transparent p-6 [--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
            />
          </div>
          <div className="hidden md:flex no-scrollbar inset-y-0 right-0 max-h-72 w-full scroll-pb-6 flex-col gap-4 overflow-y-auto border-t p-6 md:absolute md:max-h-none md:w-48 md:border-t-0 md:border-l">
            <TimeSlotsDesktop
              date={dateDate}
              onTimeChange={onTimeChange}
              time={time}
              timeSlots={timeSlots}
            />
          </div>
          <div className="flex justify-center md:hidden border-t p-3">
            <TimeSlotsMobile
              time={time}
              date={dateDate}
              onTimeChange={onTimeChange}
              timeSlots={timeSlots}
            />
          </div>
        </div>
        <DialogFooter className="sm:flex-col flex flex-col gap-4 border-t px-6 !py-5 md:flex-row items-center">
          <div className="text-sm">
            {dateDate && time ? (
              <DateTimeFormat date={dateDate} time={time} />
            ) : (
              "Veuillez sélectionner une date et une heure pour votre réservation."
            )}
          </div>
          <DialogClose asChild>
            <Button
              disabled={!date || !time}
              className="w-full md:ml-auto md:w-auto"
              variant="outline"
            >
              Continuer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function timeFormat(time: string) {
  return time.slice(0, 5);
}

function DateTimeFormat({ date, time }: { date: Date; time: string }) {
  return (
    <>
      <span>Votre réservation est planifiée pour le </span>
      <strong>{FullDateFormat.format(date)}</strong> à{" "}
      <strong>{timeFormat(time)}</strong>.
    </>
  );
}

function TimeSlotsDesktop({
  time,
  date,
  timeSlots,
  onTimeChange,
}: {
  time: string | undefined;
  date: Date | undefined;
  timeSlots: (date: Date) => Temporal.PlainTime[][];
  onTimeChange: (time: string | undefined) => void;
}) {
  if (!date)
    return (
      <span className="text-muted-foreground grow flex items-center justify-center text-center">
        Sélectionnez une date
      </span>
    );

  return (
    <div className="grid gap-2">
      {timeSlots(date).map((g, i) => (
        <Fragment key={crypto.randomUUID()}>
          {g.map((t) => (
            <Button
              key={g + t.toString()}
              variant={t.toString() === time ? "default" : "outline"}
              onClick={() => onTimeChange(t.toString())}
              className="w-full shadow-none"
            >
              {t.toString({
                smallestUnit: "minute",
              })}
            </Button>
          ))}
          {i < timeSlots(date).length - 1 && (
            <Separator className="border-2 rounded" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

function TimeSlotsMobile({
  time,
  date,
  timeSlots,
  onTimeChange,
}: {
  date: Date | undefined;
  time: string | undefined;
  timeSlots: (date: Date) => Temporal.PlainTime[][];
  onTimeChange: (time: string | undefined) => void;
}) {
  if (!date)
    return (
      <span className="text-muted-foreground grow flex items-center justify-center text-center">
        Sélectionnez une date
      </span>
    );
  console.log(time);
  return (
    <select
      name="time"
      value={time}
      onChange={(e) => onTimeChange(e.target.value)}
    >
      <option value={undefined} selected disabled hidden>
        Sélectionner une heure
      </option>
      {timeSlots(date).map((g, i) => (
        <Fragment key={crypto.randomUUID()}>
          {g.map((t) => (
            <option key={g + t.toString()} value={t.toString()}>
              {t.toString({
                smallestUnit: "minute",
              })}
            </option>
          ))}
          {i < timeSlots(date).length - 1 && <hr />}
        </Fragment>
      ))}
    </select>
  );
}
