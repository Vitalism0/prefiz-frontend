"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Lightbulb, Menu, X } from "lucide-react";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslations } from "next-intl";
import css from "./Header.module.css";
import { useMe } from "@/lib/auth/useMe";
import { authApi } from "@/lib/auth/api";

export default function Header() {
  const t = useTranslations("header");
  const router = useRouter();
  const { user, loading, refresh } = useMe();
  const [menuOpen, setMenuOpen] = useState(false);

  async function onLogout() {
    await authApi.logout();
    await refresh();
    router.push("/");
    setMenuOpen(false);
  }

  const navLinks = [
    { href: "/aktualnosci", label: t("news") },
    { href: "/oferta", label: t("offer") },
    { href: "/o-nas", label: t("about") },
    { href: "/projekty", label: t("projects") },
    { href: "/opinie", label: t("reviews") },
    { href: "/faq", label: t("faq") },
    { href: "/kontakt", label: t("contact") },
  ];

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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={css.navLink}>
              {link.label}
            </Link>
          ))}
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

          <button
            type="button"
            className={css.burger}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={css.mobileMenu} aria-label="Mobile navigation">
          <nav className={css.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={css.mobileNavLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!loading && (
            <div className={css.mobileAuth}>
              {!user ? (
                <>
                  <Link
                    href="/sign-in"
                    className={css.mobileAuthBtn}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t("signIn")}
                  </Link>
                  <Link
                    href="/sign-up"
                    className={css.mobileAuthBtn}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t("signUp")}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className={css.mobileAuthBtn}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t("profile")}
                  </Link>
                  <button
                    type="button"
                    className={css.mobileAuthBtn}
                    onClick={onLogout}
                  >
                    {t("logout")}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
