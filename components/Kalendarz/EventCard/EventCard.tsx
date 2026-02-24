import type { CalendarEvent } from "@/lib/kalendarz/types";
import Image from "next/image";
import css from "./EventCard.module.css";

const typeLabel: Record<CalendarEvent["type"], string> = {
  warsztat: "Warsztat",
  pokaz: "Pokaz",
  kurs_it: "Kurs IT",
};

export default function EventCard({
  event,
  locale,
}: {
  event: CalendarEvent;
  locale: string;
}) {
  const d = new Date(event.startAt);

  const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat(locale, { month: "2-digit" }).format(d);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    d,
  );
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  return (
    <div className={css.card}>
      {/* date */}
      <div className={css.date}>
        <div className={css.day}>
          {day}.{month}
        </div>
        <div className={css.weekday}>{weekday}</div>
      </div>

      {/* image */}
      <div className={css.imageWrap}>
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          unoptimized
          className={css.image}
          sizes="(max-width: 520px) 100vw, 160px"
        />
      </div>

      {/* info */}
      <div className={css.info}>
        <div className={css.type}>{typeLabel[event.type]}</div>
        <div className={css.title}>{event.title}</div>
        <div className={css.desc}>{event.description}</div>

        <div className={css.meta}>
          <span>
            {day}.{month} • {time}
          </span>
          <span>{event.place}</span>
          <span>{event.ageGroup}</span>
        </div>
      </div>
    </div>
  );
}
