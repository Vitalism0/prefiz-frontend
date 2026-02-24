import type { CalendarEvent, EventType } from "./types";

export function addMonthsSafe(date: Date, delta: number) {
  const d = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  return d;
}

export function getMonthRange(monthDate: Date) {
  const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1);
  return { start, end };
}

export function isInRange(d: Date, start: Date, end: Date) {
  return d.getTime() >= start.getTime() && d.getTime() < end.getTime();
}

export function formatMonthTitle(date: Date, locale: string) {
  const fmt = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  return fmt.format(date).toLowerCase();
}

export function formatTime(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatDayLeft(date: Date, locale: string) {
  const dateFmt = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
  });
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: "long" });

  return {
    date: dateFmt.format(date),
    weekday: weekdayFmt.format(date).toLowerCase(),
  };
}

export function getTypeLabel(t: EventType) {
  switch (t) {
    case "warsztat":
      return "Warsztat";
    case "pokaz":
      return "Pokaz";
    case "kurs_it":
      return "Kurs IT";
  }
}

export function groupByDay(events: CalendarEvent[]) {
  const map = new Map<string, CalendarEvent[]>();

  for (const e of events) {
    const d = new Date(e.startAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;

    const arr = map.get(key) ?? [];
    arr.push(e);
    map.set(key, arr);
  }

  const keys = Array.from(map.keys()).sort();
  return keys.map((k) => ({
    dateKey: k,
    items: map
      .get(k)!
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
      ),
  }));
}
