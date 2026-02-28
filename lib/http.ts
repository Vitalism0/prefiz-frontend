export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function http<T>(path: string, options: RequestInit = {}): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
    },
  });

  const ct = res.headers.get("content-type") ?? "";
  const isJson = ct.includes("application/json");

  if (!res.ok) {
    if (isJson) {
      const e = await res.json();
      throw new Error(e?.error ?? `${res.status} ${res.statusText}`);
    }
    const text = await res.text().catch(() => "");
    throw new Error(text || `${res.status} ${res.statusText}`);
  }

  if (isJson) return res.json() as Promise<T>;
  return {} as T;
}
