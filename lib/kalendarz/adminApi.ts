import type { CalendarEvent } from "./types";
import type { AdminRegistrationRow } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type MeResponse = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
};
export type AdminEventRegistration = {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  phone: string;
  createdAt: string;
  user: { email: string };
};

export async function fetchMe(): Promise<MeResponse | null> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // ✅ cookie token
    cache: "no-store",
  });

  if (res.status === 401) return null; // not logged in
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /auth/me failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function deleteAdminEvent(id: string): Promise<{ ok: true }> {
  const res = await fetch(`${API_URL}/admin/events/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include", // ✅ cookie token
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`DELETE /admin/events/:id failed (${res.status}): ${text}`);
  }

  return res.json();
}

// (optional) якщо колись захочеш адмін-список
export async function fetchAdminEvents(): Promise<CalendarEvent[]> {
  const res = await fetch(`${API_URL}/admin/events`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /admin/events failed (${res.status}): ${text}`);
  }

  return res.json();
}

export async function fetchAllAdminRegistrations(): Promise<
  AdminRegistrationRow[]
> {
  const res = await fetch(`${API_URL}/admin/registrations`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /admin/registrations failed (${res.status}): ${text}`);
  }

  return res.json();
}
export async function fetchRegistrationsForEvent(
  eventId: string,
): Promise<AdminEventRegistration[]> {
  const res = await fetch(
    `${API_URL}/admin/events/${encodeURIComponent(eventId)}/registrations`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GET /admin/events/:id/registrations failed (${res.status}): ${text}`,
    );
  }

  return res.json();
}
