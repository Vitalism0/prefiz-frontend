"use client";

import kalCss from "@/components/Kalendarz/Kalendarz.module.css";
import rowCss from "./EventList.module.css";

import type { CalendarEvent } from "@/lib/kalendarz/types";
import EventCard from "@/components/Kalendarz/EventCard/EventCard";
import { Link } from "@/i18n/navigation";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMe } from "@/lib/auth/useMe";
import RegisterModal from "@/components/Kalendarz/RegisterModal/RegisterModal";

type Props = {
  events: CalendarEvent[];
  locale: string;
  isAdmin: boolean;
  deletingId: string | null;
  onDelete: (id: string) => void;
};

function dayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function EventList({
  events,
  locale,
  isAdmin,
  deletingId,
  onDelete,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { user, loading } = useMe();

  const [open, setOpen] = useState(false);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState<string | undefined>(undefined);

  function handleRegister(ev: CalendarEvent) {
    if (loading) return;

    const qs = searchParams.toString();
    const nextUrl = qs ? `${pathname}?${qs}` : pathname;

    if (!user) {
      router.push(`/${locale}/sign-up?next=${encodeURIComponent(nextUrl)}`);
      return;
    }

    setActiveEventId(ev.id);
    setActiveTitle(ev.title);
    setOpen(true);
  }

  if (events.length === 0) {
    return <div className={kalCss.empty}>Brak wydarzeń w tym miesiącu.</div>;
  }

  const groups = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const key = dayKey(new Date(e.startAt));
    const arr = groups.get(key) ?? [];
    arr.push(e);
    groups.set(key, arr);
  }

  const keys = Array.from(groups.keys()).sort();

  const fmtDate = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const fmtWeekday = new Intl.DateTimeFormat(locale, { weekday: "long" });

  return (
    <>
      <div className={kalCss.list}>
        {keys.map((k) => {
          const list = (groups.get(k) ?? []).sort(
            (a, b) =>
              new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
          );

          const d = new Date(`${k}T12:00:00`);

          return (
            <div key={k} className={kalCss.dayRow}>
              <div className={kalCss.dayLeft}>
                <div className={kalCss.dayDate}>{fmtDate.format(d)}</div>
                <div className={kalCss.dayWeekday}>{fmtWeekday.format(d)}</div>
              </div>

              <div className={kalCss.dayRight}>
                {list.map((ev) => (
                  <div key={ev.id} className={rowCss.eventRow}>
                    <Link
                      href={`/wydarzenia/${ev.id}`}
                      className={rowCss.eventLink}
                    >
                      <EventCard event={ev} locale={locale} />
                    </Link>

                    <div className={rowCss.buttonsCol}>
                      <button
                        type="button"
                        className={`${rowCss.btn} ${rowCss.primary}`}
                        onClick={() => handleRegister(ev)}
                        disabled={loading}
                      >
                        Zapisz się
                      </button>

                      {isAdmin && (
                        <>
                          {/* NEW: кнопка перегляду записів */}
                          <Link
                            href={`/admin/events/${ev.id}/registrations`}
                            className={`${rowCss.btn} ${rowCss.secondary}`}
                            title="Zobacz kto się zapisał"
                          >
                            Zgłoszenia
                          </Link>

                          <button
                            type="button"
                            className={`${rowCss.btn} ${rowCss.danger}`}
                            disabled={deletingId === ev.id}
                            onClick={() => onDelete(ev.id)}
                            title="Usuń wydarzenie"
                          >
                            {deletingId === ev.id ? "Usuwanie..." : "Usuń"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {activeEventId ? (
        <RegisterModal
          open={open}
          onClose={() => setOpen(false)}
          eventId={activeEventId}
          eventTitle={activeTitle}
        />
      ) : null}
    </>
  );
}
