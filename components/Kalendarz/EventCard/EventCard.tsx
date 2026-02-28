import type { CalendarEvent } from "@/lib/kalendarz/types";
import Image from "next/image";
import css from "./EventCard.module.css";

const typeLabels: Record<CalendarEvent["type"], string> = {
  warsztat: "Warsztat",
  pokaz: "Pokaz",
  kurs_it: "Kurs IT",
};

const typeBadgeClass: Record<CalendarEvent["type"], string> = {
  warsztat: css.typeWarsztat,
  pokaz: css.typePokaz,
  kurs_it: css.typeKursIt,
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
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);

  return (
    <div className={css.card}>
      {/* image */}
      <div className={css.imageWrap}>
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          unoptimized
          className={css.image}
          sizes="(max-width: 600px) 100vw, 160px"
        />
      </div>

      {/* info */}
      <div className={css.info}>
        <span className={`${css.typeBadge} ${typeBadgeClass[event.type]}`}>
          {typeLabels[event.type]}
        </span>

        <div className={css.title}>{event.title}</div>
        <div className={css.desc}>{event.description}</div>

        <div className={css.meta}>
          <span>{day}.{month} • {time}</span>
          <span className={css.metaDot}>·</span>
          <span>{event.place}</span>
          <span className={css.metaDot}>·</span>
          <span>{event.ageGroup}</span>
        </div>
      </div>
    </div>
  );
}
