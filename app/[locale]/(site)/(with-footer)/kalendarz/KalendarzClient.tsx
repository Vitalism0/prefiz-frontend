"use client";

import { useEffect, useMemo, useState } from "react";
import { addMonths, format } from "date-fns";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import css from "@/components/Kalendarz/Kalendarz.module.css";
import { fetchEventsByMonth } from "@/lib/kalendarz/api";
import type { CalendarEvent, EventType } from "@/lib/kalendarz/types";

import EventList from "@/components/Kalendarz/EventList/EventList";
import { fetchMe, deleteAdminEvent } from "@/lib/kalendarz/adminApi";

type Props = {
  locale: string;
  initialMonth?: string;
};

function isMonthKey(v?: string) {
  return !!v && /^\d{4}-\d{2}$/.test(v);
}

export default function KalendarzClient({ locale, initialMonth }: Props) {
  const router = useRouter();
  const tc = useTranslations("calendar");

  const [month, setMonth] = useState(() =>
    isMonthKey(initialMonth) ? initialMonth! : format(new Date(), "yyyy-MM"),
  );

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // фільтри
  const [type, setType] = useState<"all" | EventType>("all");
  const [place, setPlace] = useState<"all" | string>("all");
  const [ageGroup, setAgeGroup] = useState<"all" | string>("all");

  const monthLabel = useMemo(() => {
    const d = new Date(`${month}-01T00:00:00.000Z`);
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
    }).format(d);
  }, [month, locale]);

  const typeLabel = (t: string) => {
    if (t === "warsztat") return tc("type_warsztat");
    if (t === "pokaz") return tc("type_pokaz");
    if (t === "kurs_it") return tc("type_kurs_it");
    return t;
  };

  // ✅ визначаємо чи ADMIN (1 раз)
  useEffect(() => {
    let cancelled = false;

    fetchMe()
      .then((me) => {
        if (cancelled) return;
        setIsAdmin(me?.role === "ADMIN");
      })
      .catch(() => {
        if (cancelled) return;
        setIsAdmin(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // fetch events when month changes
  useEffect(() => {
    let cancelled = false;

    fetchEventsByMonth(month)
      .then((data) => {
        if (cancelled) return;
        setEvents(data);
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Fetch error");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [month]);

  // sync url
  useEffect(() => {
    router.replace(`/kalendarz?month=${month}`);
  }, [month, router]);

  const changeMonth = (delta: number) => {
    setLoading(true);
    setError(null);
    const d = new Date(`${month}-01T00:00:00.000Z`);
    setMonth(format(addMonths(d, delta), "yyyy-MM"));
  };

  const options = useMemo(() => {
    const types = Array.from(new Set(events.map((e) => e.type)));
    const places = Array.from(new Set(events.map((e) => e.place)));
    const ages = Array.from(new Set(events.map((e) => e.ageGroup)));
    return { types, places, ages };
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (place !== "all" && e.place !== place) return false;
      if (ageGroup !== "all" && e.ageGroup !== ageGroup) return false;
      return true;
    });
  }, [events, type, place, ageGroup]);

  // ✅ delete handler (тільки для ADMIN)
  const handleDelete = async (id: string) => {
    if (!isAdmin) return;

    const ok = confirm("Na pewno usunąć to wydarzenie?");
    if (!ok) return;

    setDeletingId(id);
    setError(null);

    try {
      await deleteAdminEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className={css.page}>
      <div className={css.container}>
        {/* HEADER */}
        <div className={css.headerRow}>
          <button
            className={css.navBtn}
            onClick={() => changeMonth(-1)}
            type="button"
          >
            ←
          </button>
          <div className={css.monthTitle}>{monthLabel}</div>
          <button
            className={css.navBtn}
            onClick={() => changeMonth(1)}
            type="button"
          >
            →
          </button>
        </div>

        {/* FILTERS */}
        <div className={css.filtersRow}>
          <div className={css.filter}>
            <div className={css.filterLabel}>Rodzaj wydarzenia</div>
            <select
              className={css.select}
              value={type}
              onChange={(e) => {
                const v = e.target.value;
                if (
                  v === "all" ||
                  v === "warsztat" ||
                  v === "pokaz" ||
                  v === "kurs_it"
                ) {
                  setType(v);
                }
              }}
            >
              <option value="all">{tc("type_all")}</option>
              {options.types.map((t) => (
                <option key={t} value={t}>
                  {typeLabel(t)}
                </option>
              ))}
            </select>
          </div>

          <div className={css.filter}>
            <div className={css.filterLabel}>Miejsce</div>
            <select
              className={css.select}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              <option value="all">{tc("type_all")}</option>
              {options.places.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className={css.filter}>
            <div className={css.filterLabel}>Wiek</div>
            <select
              className={css.select}
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="all">{tc("type_all")}</option>
              {options.ages.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={css.divider} />

        {/* LIST */}
        {loading && <div className={css.empty}>Loading...</div>}
        {error && <div className={css.empty}>Error: {error}</div>}
        {!loading && !error && (
          <EventList
            events={filtered}
            locale={locale}
            isAdmin={isAdmin}
            deletingId={deletingId}
            onDelete={handleDelete}
          />
        )}
      </div>
    </main>
  );
}
