import css from "./ReviewsSection.module.css";
import { useTranslations } from "next-intl";

export default function ReviewsSection() {
  const t = useTranslations("reviews");

  const reviews = [
    { name: t("r1.name"), text: t("r1.text") },
    { name: t("r2.name"), text: t("r2.text") },
    { name: t("r3.name"), text: t("r3.text") },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className={css.title}>{t("title")}</h2>
        <p className={css.subtitle}>{t("subtitle")}</p>

        <div className={css.grid}>
          {reviews.map((r) => (
            <article key={r.name} className={css.card}>
              <div className={css.stars}>★★★★★</div>
              <p className={css.text}>{r.text}</p>
              <div className={css.name}>{r.name}</div>
            </article>
          ))}
        </div>

        <div className={css.controls}>
          <button className={css.arrow} aria-label={t("prev")}>
            ‹
          </button>
          <button className={css.arrow} aria-label={t("next")}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
