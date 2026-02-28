// lib/auth/api.ts
import { http } from "../http";

export type User = { id: string; email: string; role: "USER" | "ADMIN" };

export const authApi = {
  register: (data: { email: string; password: string }) =>
    http<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    http<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    http<{ ok: true }>("/auth/logout", {
      method: "POST",
    }),

  me: () => http<User>("/auth/me"),
};
