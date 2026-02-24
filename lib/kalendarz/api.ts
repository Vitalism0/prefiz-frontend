// lib/kalendarz/api.ts
import type { CalendarEvent } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function fetchEventsByMonth(
  month: string,
): Promise<CalendarEvent[]> {
  const res = await fetch(
    `${API_URL}/events?month=${encodeURIComponent(month)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /events failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function fetchEventById(id: string): Promise<CalendarEvent> {
  if (!id || id === "undefined") {
    throw new Error(`fetchEventById got invalid id: "${id}"`);
  }

  const res = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /events/:id failed (${res.status}): ${text}`);
  }

  return res.json();
}
