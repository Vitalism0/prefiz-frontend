"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import css from "./LanguageSwitch.module.css";

function parseLocale(path: string) {
  const match = path.match(/^\/(pl|uk)(?=\/|$)/);
  const locale = (match?.[1] ?? "pl") as "pl" | "uk";
  const cleanPath = path.replace(/^\/(pl|uk)(?=\/|$)/, "") || "/";
  return { locale, cleanPath };
}

export default function LanguageSwitch() {
  const pathname = usePathname() || "/";
  const { locale, cleanPath } = useMemo(
    () => parseLocale(pathname),
    [pathname],
  );

  const label = locale === "pl" ? "PL" : "UA";

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
            className={`${css.item} ${locale === "pl" ? css.active : ""}`}
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            PL
          </Link>

          <Link
            href={cleanPath}
            locale="uk"
            className={`${css.item} ${locale === "uk" ? css.active : ""}`}
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            UA
          </Link>
        </div>
      )}
    </div>
  );
}
