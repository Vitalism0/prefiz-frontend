const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (ct.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.error || "Request failed");
    }
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  if (ct.includes("application/json")) return res.json();
  return {} as T;
}

export type RegistrationCreate = { name: string; phone: string };

export const registrationsApi = {
  create: (eventId: string, data: RegistrationCreate) =>
    request(`/events/${eventId}/registrations`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
