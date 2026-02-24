"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { fetchAllAdminRegistrations } from "@/lib/kalendarz/adminApi";
import type { AdminRegistrationRow } from "@/lib/kalendarz/types";

import css from "./page.module.css";

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return fallback;
}

export default function AdminRegistrationsPage() {
  const [items, setItems] = useState<AdminRegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchAllAdminRegistrations();
        if (active) setItems(data);
      } catch (e: unknown) {
        if (active) setError(getErrorMessage(e, "Błąd pobierania"));
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <main className={css.main}>Loading...</main>;
  if (error) return <main className={`${css.main} ${css.error}`}>{error}</main>;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.headerRow}>
          <div className={css.headerLeft}>
            <Link className={css.backBtn} href="/profile">
              ← Profil
            </Link>

            <div>
              <h1 className={css.title}>Rejestracje</h1>
              <p className={css.subtitle}>Kto i na jakie wydarzenie</p>
            </div>
          </div>

          <div className={css.countPill}>
            Razem: <b>{items.length}</b>
          </div>
        </div>

        {items.length === 0 ? (
          <div className={css.emptyCard}>Brak zapisów.</div>
        ) : (
          <div className={css.card}>
            <div className={css.tableWrap}>
              <table className={css.table}>
                <thead className={css.thead}>
                  <tr>
                    <th className={css.th}>Wydarzenie</th>
                    <th className={css.th}>Data</th>
                    <th className={css.th}>Miejsce</th>
                    <th className={css.th}>Imię i nazwisko</th>
                    <th className={css.th}>Telefon</th>
                    <th className={css.th}>Email</th>
                    <th className={css.th}>Zgłoszono</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((r) => (
                    <tr key={r.id} className={css.tr}>
                      <td className={css.td}>
                        <Link
                          className={css.link}
                          href={`/wydarzenia/${r.event.id}`}
                        >
                          {r.event.title}
                        </Link>
                      </td>

                      <td className={css.td}>
                        <span className={css.pill}>
                          {new Date(r.event.startAt).toLocaleString()}
                        </span>
                      </td>

                      <td className={css.td}>{r.event.place}</td>
                      <td className={css.td}>{r.name}</td>

                      <td className={css.td}>
                        <span className={css.monoPill}>{r.phone}</span>
                      </td>

                      <td className={css.td}>
                        <span className={css.email}>
                          {r.user?.email ?? "-"}
                        </span>
                      </td>

                      <td className={css.td}>
                        <span className={css.muted}>
                          {new Date(r.createdAt).toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
