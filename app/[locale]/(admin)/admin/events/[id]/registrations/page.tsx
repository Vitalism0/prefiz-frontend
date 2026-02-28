"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import type { ApiEvent } from "@/lib/prefizApi";
import { fetchEventById } from "@/lib/kalendarz/api";
import { fetchRegistrationsForEvent } from "@/lib/kalendarz/adminApi";
import type { AdminEventRegistration } from "@/lib/kalendarz/adminApi";
import { getErrorMessage } from "@/lib/auth/getErrorMessage";

import css from "./page.module.css";

export default function AdminEventRegistrationsPage() {
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [items, setItems] = useState<AdminEventRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const [evData, regs] = await Promise.all([
          fetchEventById(eventId),
          fetchRegistrationsForEvent(eventId),
        ]);

        if (!active) return;
        setEvent(evData as unknown as ApiEvent);
        setItems(regs);
      } catch (e: unknown) {
        if (active) setError(getErrorMessage(e, "Błąd"));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [eventId]);

  if (loading) return <main className={css.main}>Loading...</main>;
  if (error) return <main className={`${css.main} ${css.error}`}>{error}</main>;

  return (
    <main className={css.main}>
      <h1 className={css.title}>Zgłoszenia</h1>

      {event && (
        <div className={css.eventBox}>
          <div>
            <b>Wydarzenie:</b> {event.title}
          </div>
          <div>
            <b>Data:</b> {new Date(event.startAt).toLocaleString()}
          </div>
          <div>
            <b>Miejsce:</b> {event.place}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className={css.empty}>Nikt się jeszcze nie zapisał.</p>
      ) : (
        <div className={css.tableWrap}>
          <table className={css.table}>
            <thead>
              <tr>
                <th className={css.th}>Imię i nazwisko</th>
                <th className={css.th}>Telefon</th>
                <th className={css.th}>Email</th>
                <th className={css.th}>Zgłoszono</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className={css.tr}>
                  <td className={css.td}>{r.name}</td>
                  <td className={css.td}>{r.phone}</td>
                  <td className={css.td}>{r.user?.email ?? "-"}</td>
                  <td className={css.td}>
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
