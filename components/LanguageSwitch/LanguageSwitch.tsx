"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import css from "./LanguageSwitch.module.css";

function getLocaleFromPath(path: string) {
  const match = path.match(
    new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`),
  );
  return (match?.[1] ??
    routing.defaultLocale) as (typeof routing.locales)[number];
}

function stripLocalePrefix(path: string) {
  let clean = path || "/";
  const pattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);

  // прибираємо навіть дубль: /pl/pl -> /
  while (pattern.test(clean)) {
    clean = clean.replace(pattern, "") || "/";
  }

  return clean;
}

export default function LanguageSwitch() {
  const pathname = usePathname() || "/";

  const currentLocale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const cleanPath = useMemo(() => stripLocalePrefix(pathname), [pathname]);

  const label = currentLocale === "pl" ? "PL" : "UA";

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const onPick = (target: "pl" | "uk") => (e: React.MouseEvent) => {
    // якщо клік по поточній мові — не навігувати, просто закрити меню
    if (target === currentLocale) e.preventDefault();
    setOpen(false);
  };

  return (
    <div className={css.root} ref={ref}>
      <button
        type="button"
        className={css.button}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label} <span className={css.chevron}>▾</span>
      </button>

      {open && (
        <div className={css.menu} role="menu">
          <Link
            href={cleanPath}
            locale="pl"
            className={`${css.item} ${currentLocale === "pl" ? css.active : ""}`}
            onClick={onPick("pl")}
            role="menuitem"
          >
            PL
          </Link>

          <Link
            href={cleanPath}
            locale="uk"
            className={`${css.item} ${currentLocale === "uk" ? css.active : ""}`}
            onClick={onPick("uk")}
            role="menuitem"
          >
            UA
          </Link>
        </div>
      )}
    </div>
  );
}
