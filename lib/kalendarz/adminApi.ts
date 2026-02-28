import { http } from "../http";
import type { CalendarEvent } from "./types";
import type { AdminRegistrationRow } from "./types";

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
  try {
    return await http<MeResponse>("/auth/me", { cache: "no-store" });
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("401")) return null;
    throw e;
  }
}

export async function deleteAdminEvent(id: string): Promise<{ ok: true }> {
  return http<{ ok: true }>(
    `/admin/events/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
}

export async function fetchAdminEvents(): Promise<CalendarEvent[]> {
  return http<CalendarEvent[]>("/admin/events", { cache: "no-store" });
}

export async function fetchAllAdminRegistrations(): Promise<
  AdminRegistrationRow[]
> {
  return http<AdminRegistrationRow[]>("/admin/registrations", {
    cache: "no-store",
  });
}

export async function fetchRegistrationsForEvent(
  eventId: string,
): Promise<AdminEventRegistration[]> {
  return http<AdminEventRegistration[]>(
    `/admin/events/${encodeURIComponent(eventId)}/registrations`,
    { cache: "no-store" },
  );
}

export async function createAdminEvent(
  fd: FormData,
): Promise<CalendarEvent> {
  return http<CalendarEvent>("/admin/events", {
    method: "POST",
    body: fd,
  });
}
