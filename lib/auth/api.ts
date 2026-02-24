// lib/auth/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type User = { id: string; email: string; role: "USER" | "ADMIN" };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include", // важливо для cookie JWT
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    // пробуємо JSON, якщо ні — текст (HTML)
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.error || "Request failed");
    }
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  if (contentType.includes("application/json")) return res.json();
  return {} as T;
}

export const authApi = {
  register: (data: { email: string; password: string }) =>
    request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    request<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<{ ok: true }>("/auth/logout", {
      method: "POST",
    }),

  me: () => request<User>("/auth/me"),
};
