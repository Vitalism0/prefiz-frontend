"use client";

import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

type EventType = "warsztat" | "pokaz" | "kurs_it";
const EVENT_TYPES: EventType[] = ["warsztat", "pokaz", "kurs_it"];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function AdminNewEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<EventType>("warsztat");
  const [place, setPlace] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [startAtLocal, setStartAtLocal] = useState(""); // datetime-local
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const startAtIso = startAtLocal
        ? new Date(startAtLocal).toISOString()
        : "";

      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("type", type);
      fd.append("place", place);
      fd.append("ageGroup", ageGroup);
      fd.append("startAt", startAtIso);

      if (file) {
        fd.append("image", file); // ключ має бути "image"
      } else {
        fd.append("imageUrl", "/images/hero/hero-1.jpg");
      }

      const res = await fetch(`${API_URL}/events`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`POST /events failed (${res.status}): ${text}`);
      }

      router.push("/kalendarz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Dodaj wydarzenie</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Tytuł
            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Opis
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Typ
            <select
              className={styles.input}
              value={type}
              onChange={(e) => {
                const v = e.target.value as EventType;
                if (EVENT_TYPES.includes(v)) setType(v);
              }}
            >
              <option value="warsztat">warsztat</option>
              <option value="pokaz">pokaz</option>
              <option value="kurs_it">kurs_it</option>
            </select>
          </label>

          <label className={styles.label}>
            Miejsce
            <input
              className={styles.input}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Wiek (ageGroup)
            <input
              className={styles.input}
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Data i godzina
            <input
              className={styles.input}
              type="datetime-local"
              value={startAtLocal}
              onChange={(e) => setStartAtLocal(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Obrazek (z komputera)
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {error && <p className={styles.serverErr}>{error}</p>}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Dodawanie..." : "Dodaj"}
          </button>
        </form>
      </div>
    </main>
  );
}
