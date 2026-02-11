"use client";

import css from "./Footer.module.css";
import { useTranslations } from "next-intl";

export default function NewsletterForm() {
  const t = useTranslations("footer");

  return (
    <form className={css.form} onSubmit={(e) => e.preventDefault()}>
      <input
        className={css.input}
        type="email"
        placeholder={t("emailPlaceholder")}
        aria-label={t("emailPlaceholder")}
      />
      <button className={css.button} type="submit">
        {t("subscribe")}
      </button>
    </form>
  );
}
