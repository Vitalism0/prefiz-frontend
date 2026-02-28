// lib/kalendarz/api.ts
import { http } from "../http";
import type { CalendarEvent } from "./types";

export async function fetchEventsByMonth(
  month: string,
): Promise<CalendarEvent[]> {
  return http<CalendarEvent[]>(
    `/events?month=${encodeURIComponent(month)}`,
    { cache: "no-store" },
  );
}

export async function fetchEventById(id: string): Promise<CalendarEvent> {
  if (!id || id === "undefined") {
    throw new Error(`fetchEventById got invalid id: "${id}"`);
  }

  return http<CalendarEvent>(
    `/events/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
}
