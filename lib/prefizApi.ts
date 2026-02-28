import { http } from "./http";

export type ApiRole = "USER" | "ADMIN";

export type ApiUser = {
  id: string;
  email: string;
  role: ApiRole;
};

export type ApiEvent = {
  id: string;
  title: string;
  description: string;
  type: "warsztat" | "pokaz" | "kurs_it";
  place: string;
  ageGroup: string;
  startAt: string; // ISO
  imageUrl: string;
  createdAt: string;
};

export type CreateEventPayload = {
  title: string;
  description: string;
  type: ApiEvent["type"];
  place: string;
  ageGroup: string;
  startAt: string; // ISO
  imageUrl: string;
};

// -------- Auth --------
export function login(email: string, password: string) {
  return http<ApiUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function me() {
  return http<ApiUser>("/auth/me");
}

export function logout() {
  return http<{ ok: true }>("/auth/logout", { method: "POST" });
}

// -------- Events --------
export function getEventsByMonth(month: string): Promise<ApiEvent[]> {
  return http<ApiEvent[]>(`/events?month=${encodeURIComponent(month)}`, {
    cache: "no-store",
  });
}

export function createEvent(payload: CreateEventPayload) {
  return http<ApiEvent>("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
