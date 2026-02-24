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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    let details = `${res.status} ${res.statusText}`;
    try {
      const data = await res.json();
      details =
        typeof data?.error === "string" ? data.error : JSON.stringify(data);
    } catch {}
    throw new Error(details);
  }

  return (await res.json()) as T;
}

// -------- Auth --------
export function login(email: string, password: string) {
  return api<ApiUser>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function me() {
  return api<ApiUser>("/auth/me");
}

export function logout() {
  return api<{ ok: true }>("/auth/logout", { method: "POST" });
}

// -------- Events --------
export async function getEventsByMonth(month: string): Promise<ApiEvent[]> {
  const res = await fetch(
    `${API_URL}/events?month=${encodeURIComponent(month)}`,
    {
      method: "GET",
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET /events failed (${res.status}) ${text}`);
  }

  return res.json();
}

export function createEvent(payload: CreateEventPayload) {
  return api<ApiEvent>("/events", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
