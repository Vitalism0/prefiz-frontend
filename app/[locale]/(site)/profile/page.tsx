"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { authApi, type User } from "@/lib/auth/api";
import css from "./Profile.module.css";

function getErrorMessage(err: unknown, fallback: string) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return fallback;
}

export default function ProfilePage() {
  const t = useTranslations("profile");
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authApi
      .me()
      .then(setUser)
      .catch((e: unknown) => setError(getErrorMessage(e, "Unauthorized")));
  }, []);

  async function logout() {
    await authApi.logout();
    router.replace("/sign-in");
  }

  // --- Unauthorized / Not logged in ---
  if (error) {
    return (
      <main className={css.page}>
        <div className={css.container}>
          <section className={css.hero}>
            <div className={css.avatar} aria-hidden />
            <div className={css.heroInfo}>
              <div className={css.heroTopRow}>
                <h1 className={css.title}>{t("title")}</h1>
                <span className={`${css.badge} ${css.badgeUser}`}>
                  {t("guestBadge")}
                </span>
              </div>
              <p className={css.subtext}>{t("notLogged.subtext")}</p>
            </div>
          </section>

          <section className={css.grid}>
            <div className={css.card}>
              <h2 className={css.cardTitle}>{t("access.title")}</h2>

              <div className={css.alert}>
                <div className={css.alertTitle}>
                  {t("access.unauthorizedTitle")}
                </div>
                <div className={css.alertText}>{error}</div>
              </div>

              <div className={css.actionsRow}>
                <Link className={css.primaryBtn} href="/sign-in">
                  {t("actions.signIn")}
                </Link>
                <Link className={css.secondaryBtn} href="/sign-up">
                  {t("actions.signUp")}
                </Link>
                <Link className={css.ghostBtn} href="/kalendarz">
                  {t("actions.calendar")}
                </Link>
              </div>
            </div>

            <div className={css.card}>
              <h2 className={css.cardTitle}>{t("quickLinks.title")}</h2>

              <div className={css.actionsCol}>
                {/* removed: Oferta / Kontakt / FAQ */}
              </div>

              <div className={css.tip}>
                <div className={css.tipTitle}>{t("tip.title")}</div>
                <div className={css.tipText}>{t("tip.notLogged")}</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // --- Loading ---
  if (!user) {
    return (
      <main className={css.page}>
        <div className={css.container}>
          <div className={css.skeletonHero} />
          <div className={css.skeletonGrid}>
            <div className={css.skeletonCard} />
            <div className={css.skeletonCard} />
          </div>
        </div>
      </main>
    );
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <main className={css.page}>
      <div className={css.container}>
        {/* HERO */}
        <section className={css.hero}>
          <div className={css.avatar} aria-hidden />
          <div className={css.heroInfo}>
            <div className={css.heroTopRow}>
              <h1 className={css.title}>{t("title")}</h1>
              <span
                className={`${css.badge} ${
                  isAdmin ? css.badgeAdmin : css.badgeUser
                }`}
              >
                {t(`role.${user.role}`)}
              </span>
            </div>

            <div className={css.email}>{user.email}</div>
            <p className={css.subtext}>{t("welcomeSubtext")}</p>
          </div>

          <div className={css.heroActions}>
            <Link className={css.primaryBtn} href="/kalendarz">
              {t("actions.calendar")}
            </Link>
            <Link className={css.secondaryBtn} href="/wydarzenia">
              {t("actions.events")}
            </Link>
          </div>
        </section>

        {/* GRID */}
        <section className={css.grid}>
          {/* Account card */}
          <div className={css.card}>
            <h2 className={css.cardTitle}>{t("account.title")}</h2>

            <div className={css.kv}>
              <div className={css.k}>{t("account.email")}</div>
              <div className={css.v}>{user.email}</div>
            </div>

            <div className={css.kv}>
              <div className={css.k}>{t("account.role")}</div>
              <div className={css.v}>{t(`role.${user.role}`)}</div>
            </div>

            <button className={css.dangerBtn} onClick={logout} type="button">
              {t("actions.logout")}
            </button>
          </div>

          {/* Quick actions */}
          <div className={css.card}>
            <h2 className={css.cardTitle}>{t("quickActions.title")}</h2>

            <div className={css.actionsCol}>
              <Link className={css.primaryBtn} href="/kalendarz">
                {t("quickActions.viewCalendar")}
              </Link>
              <Link className={css.secondaryBtn} href="/projekty">
                {t("quickActions.projects")}
              </Link>

              {/* removed: Opinie */}
            </div>

            <div className={css.tip}>
              <div className={css.tipTitle}>{t("tip.title")}</div>
              <div className={css.tipText}>{t("tip.logged")}</div>
            </div>
          </div>

          {/* Admin tools */}
          {isAdmin && (
            <div className={`${css.card} ${css.adminCard}`}>
              <h2 className={css.cardTitle}>{t("admin.title")}</h2>
              <p className={css.muted}>{t("admin.desc")}</p>

              <div className={css.actionsCol}>
                <Link className={css.primaryBtn} href="/admin/events/new">
                  {t("admin.createEvent")}
                </Link>

                <Link className={css.secondaryBtn} href="/admin/registrations">
                  {t("admin.viewRegistrations")}
                </Link>

                <Link className={css.ghostBtn} href="/admin/events">
                  {t("admin.events")}
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
