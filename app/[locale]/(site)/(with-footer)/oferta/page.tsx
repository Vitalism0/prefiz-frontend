import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, FlaskConical, Code2, CalendarDays } from "lucide-react";
import css from "./page.module.css";

export default async function OfertaPage() {
  const t = await getTranslations("oferta");

  return (
    <main>
      {/* Hero */}
      <section className={css.hero}>
        <div className="container">
          <span className={css.heroLabel}>{t("heroLabel")}</span>
          <h1 className={css.heroTitle}>
            {t("heroTitlePre")} <span>{t("heroTitleHighlight")}</span>
          </h1>
          <p className={css.heroSubtitle}>{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* Cards */}
      <section className={css.section}>
        <div className="container">
          <h2 className={css.sectionTitle}>{t("sectionTitle")}</h2>
          <p className={css.sectionSubtitle}>{t("sectionSubtitle")}</p>

          {/* Kursy */}
          <div className={css.group}>
            <p className={css.categoryLabel}>
              <Code2 size={14} />
              {t("cat.kursy")}
            </p>
            <div className={css.grid}>
              {/* Podstawy Excel */}
              <div className={css.card}>
                <img
                  src="/images/oferta/kurs-podstawy-excel.webp"
                  alt={t("courses.excel1.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.kurs")}</span>
                  <h3 className={css.cardTitle}>{t("courses.excel1.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.excel1.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Excel dla analizy */}
              <div className={css.card}>
                <img
                  src="/images/oferta/kurs-excel-analiza-danych.webp"
                  alt={t("courses.excel2.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.kurs")}</span>
                  <h3 className={css.cardTitle}>{t("courses.excel2.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.excel2.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Figma */}
              <div className={css.card}>
                <img
                  src="/images/oferta/kurs-figma-poczatkujacy.webp"
                  alt={t("courses.figma.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.kurs")}</span>
                  <h3 className={css.cardTitle}>{t("courses.figma.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.figma.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Warsztaty */}
          <div className={css.group}>
            <p className={css.categoryLabel}>
              <FlaskConical size={14} />
              {t("cat.warsztaty")}
            </p>
            <div className={`${css.grid} ${css.grid2}`}>
              {/* Fizyka dla dzieci */}
              <div className={css.card}>
                <img
                  src="/images/oferta/warsztaty-fizyka-dzieci.webp"
                  alt={t("courses.fizyka.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.warsztat")}</span>
                  <h3 className={css.cardTitle}>{t("courses.fizyka.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.fizyka.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Elektrycznosc */}
              <div className={css.card}>
                <img
                  src="/images/oferta/warsztaty-elektrycznosc-magnetyzm.webp"
                  alt={t("courses.elektro.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.warsztat")}</span>
                  <h3 className={css.cardTitle}>{t("courses.elektro.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.elektro.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pokazy */}
          <div className={css.group}>
            <p className={css.categoryLabel}>
              <CalendarDays size={14} />
              {t("cat.pokazy")}
            </p>
            <div className={`${css.grid} ${css.grid2}`}>
              {/* Ciekly azot */}
              <div className={css.card}>
                <img
                  src="/images/oferta/pokaz-ciekly-azot.webp"
                  alt={t("courses.azot.title")}
                  className={css.cardImage}
                />
                <div className={css.cardBody}>
                  <span className={css.cardType}>{t("cat.pokaz")}</span>
                  <h3 className={css.cardTitle}>{t("courses.azot.title")}</h3>
                  <p className={css.cardDesc}>{t("courses.azot.desc")}</p>
                  <Link href="/kontakt" className={css.cardLink}>
                    {t("learnMore")} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={css.ctaStrip}>
        <div className="container">
          <h2 className={css.ctaTitle}>{t("cta.title")}</h2>
          <p className={css.ctaSubtitle}>{t("cta.subtitle")}</p>
          <div className={css.ctaActions}>
            <Link href="/kontakt" className={`btn btnPrimary ${css.ctaBtn}`}>
              {t("cta.btnContact")}
            </Link>
            <Link href="/kalendarz" className={css.ctaBtnOutline}>
              {t("cta.btnCalendar")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
