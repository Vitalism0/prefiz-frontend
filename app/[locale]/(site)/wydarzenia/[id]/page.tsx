import { Link } from "@/i18n/navigation";
import { fetchEventById } from "@/lib/kalendarz/api";
import css from "./EventDetails.module.css";
import Image from "next/image";
import { getLocale } from "next-intl/server";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ MUST
  const locale = await getLocale();

  const event = await fetchEventById(id);

  const date = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(event.startAt));

  return (
    <main className={css.wrapper}>
      <Link href="/kalendarz" className={css.backLink}>
        ← Wróć do kalendarza
      </Link>

      <section className={css.card}>
        <div className={css.row}>
          <div className={css.media}>
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 280px"
              className={css.image}
            />
          </div>

          <div className={css.content}>
            <div className={css.type}>{event.type}</div>
            <h1 className={css.title}>{event.title}</h1>

            <p className={css.desc}>{event.description}</p>

            <div className={css.meta}>
              <div>
                <b>Data:</b> {date}
              </div>
              <div>
                <b>Miejsce:</b> {event.place}
              </div>
              <div>
                <b>Wiek (ageGroup):</b> {event.ageGroup}
              </div>
            </div>

            <div className={css.actions}>
              <Link href="/kontakt" className={`${css.btn} ${css.primary}`}>
                Skontaktuj się
              </Link>

              <Link href="/kalendarz" className={`${css.btn} ${css.ghost}`}>
                Zobacz inne wydarzenia
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
