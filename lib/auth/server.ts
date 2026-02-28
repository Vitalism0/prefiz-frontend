import { cookies } from "next/headers";
import { API_URL } from "@/lib/http";

export type ServerUser = { id: string; email: string; role: "USER" | "ADMIN" };

export async function getServerMe(): Promise<ServerUser | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
