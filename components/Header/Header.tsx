"use client";

import { Link, useRouter } from "@/i18n/navigation";
import { Lightbulb } from "lucide-react";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslations } from "next-intl";
import css from "./Header.module.css";
import { useMe } from "@/lib/auth/useMe";
import { authApi } from "@/lib/auth/api";

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();
  const { user, loading, refresh } = useMe();

  async function onLogout() {
    await authApi.logout();
    await refresh();
    router.push("/");
  }

  return (
    <header className={css.header}>
      <div className={`${css.inner} container`}>
        <Link href="/" className={css.brand} aria-label="PreFiz - Home">
          <span>
            <Lightbulb color="#0D99FF" size={40} />
          </span>
          <span className={css.brandText}>PreFiz</span>
        </Link>

        <nav className={css.nav} aria-label="Main navigation">
          <Link href="/aktualnosci" className={css.navLink}>
            {t("news")}
          </Link>

          <Link href="/oferta" className={css.navLink}>
            {t("offer")} <span className={css.chevron}>▾</span>
          </Link>

          <Link href="/o-nas" className={css.navLink}>
            {t("about")}
          </Link>

          <Link href="/projekty" className={css.navLink}>
            {t("projects")}
          </Link>

          <Link href="/opinie" className={css.navLink}>
            {t("reviews")}
          </Link>

          <Link href="/faq" className={css.navLink}>
            {t("faq")}
          </Link>

          <Link href="/kontakt" className={css.navLink}>
            {t("contact")}
          </Link>
        </nav>

        <div className={css.right}>
          {!loading && !user && (
            <div className={css.auth}>
              <Link href="/sign-in" className={css.authBtn}>
                {t("signIn")}
              </Link>
              <Link href="/sign-up" className={css.authBtn}>
                {t("signUp")}
              </Link>
            </div>
          )}

          {!loading && user && (
            <div className={css.auth}>
              <Link href="/profile" className={css.authLink}>
                {t("profile")}
              </Link>
              <button type="button" className={css.authBtn} onClick={onLogout}>
                {t("logout")}
              </button>
            </div>
          )}

          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
