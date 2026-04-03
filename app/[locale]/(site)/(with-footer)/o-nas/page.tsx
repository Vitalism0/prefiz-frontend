import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Rocket,
  FlaskConical,
  Code2,
  Users,
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  Heart,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import css from "./page.module.css";
import PageNav from "./PageNav";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const navItems = [
    { id: "mission", label: t("nav.mission") },
    { id: "what-we-do", label: t("nav.whatWeDo") },
    { id: "values", label: t("nav.values") },
    { id: "location", label: t("nav.location") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className={css.hero}>
        <div className="container">
          <span className={css.heroLabel}>{t("heroLabel")}</span>
          <h1 className={css.heroTitle}>
            {t("heroTitlePre")}{" "}
            <span>{t("heroTitleHighlight")}</span>
          </h1>
          <p className={css.heroSubtitle}>{t("heroSubtitle")}</p>
        </div>
      </section>

      {/* In-page nav */}
      <PageNav items={navItems} />

      {/* Mission */}
      <section id="mission" className={css.section}>
        <div className={`container ${css.missionGrid}`}>
          <div>
            <p className={css.sectionLabel}>{t("nav.mission")}</p>
            <h2 className={css.sectionTitle}>{t("mission.title")}</h2>
            <p className={css.sectionText}>{t("mission.text1")}</p>
            <p className={css.sectionText}>{t("mission.text2")}</p>
          </div>
          <div className={css.missionVisual}>
            <div className={css.missionIcon}>
              <Rocket size={96} strokeWidth={1.2} />
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className={`${css.section} ${css.sectionAlt}`}>
        <div className="container">
          <p className={css.sectionLabel}>{t("nav.whatWeDo")}</p>
          <h2 className={css.sectionTitle}>{t("whatWeDo.title")}</h2>
          <p className={css.sectionText}>{t("whatWeDo.subtitle")}</p>

          <div className={css.offerList}>
            <div className={css.offerItem}>
              <FlaskConical size={28} className={css.offerItemIcon} />
              <div>
                <h3 className={css.offerItemTitle}>{t("whatWeDo.item1.title")}</h3>
                <p className={css.offerItemText}>{t("whatWeDo.item1.text")}</p>
              </div>
            </div>
            <div className={css.offerItem}>
              <Code2 size={28} className={css.offerItemIcon} />
              <div>
                <h3 className={css.offerItemTitle}>{t("whatWeDo.item2.title")}</h3>
                <p className={css.offerItemText}>{t("whatWeDo.item2.text")}</p>
              </div>
            </div>
            <div className={css.offerItem}>
              <CalendarDays size={28} className={css.offerItemIcon} />
              <div>
                <h3 className={css.offerItemTitle}>{t("whatWeDo.item3.title")}</h3>
                <p className={css.offerItemText}>{t("whatWeDo.item3.text")}</p>
              </div>
            </div>
            <div className={css.offerItem}>
              <Users size={28} className={css.offerItemIcon} />
              <div>
                <h3 className={css.offerItemTitle}>{t("whatWeDo.item4.title")}</h3>
                <p className={css.offerItemText}>{t("whatWeDo.item4.text")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className={css.section}>
        <div className="container">
          <p className={css.sectionLabel}>{t("nav.values")}</p>
          <h2 className={css.sectionTitle}>{t("values.title")}</h2>

          <div className={css.valuesGrid}>
            <div className={css.valueCard}>
              <Lightbulb size={36} className={css.valueIcon} />
              <h3 className={css.valueTitle}>{t("values.v1.title")}</h3>
              <p className={css.valueText}>{t("values.v1.text")}</p>
            </div>
            <div className={css.valueCard}>
              <Heart size={36} className={css.valueIcon} />
              <h3 className={css.valueTitle}>{t("values.v2.title")}</h3>
              <p className={css.valueText}>{t("values.v2.text")}</p>
            </div>
            <div className={css.valueCard}>
              <ShieldCheck size={36} className={css.valueIcon} />
              <h3 className={css.valueTitle}>{t("values.v3.title")}</h3>
              <p className={css.valueText}>{t("values.v3.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className={`${css.section} ${css.sectionAlt}`}>
        <div className="container">
          <p className={css.sectionLabel}>{t("nav.location")}</p>
          <h2 className={css.sectionTitle}>{t("location.title")}</h2>

          <div className={css.locationGrid}>
            <div className={css.locationCard}>
              <div className={css.locationRow}>
                <MapPin size={22} className={css.locationRowIcon} />
                <div>
                  <p className={css.locationRowLabel}>{t("location.addressLabel")}</p>
                  <p className={css.locationRowValue}>
                    Wyższa Szkoła Gospodarki (WSG University)<br />
                    Garbary 2, 85-229 Bydgoszcz
                  </p>
                </div>
              </div>
              <div className={css.locationRow}>
                <Mail size={22} className={css.locationRowIcon} />
                <div>
                  <p className={css.locationRowLabel}>{t("location.emailLabel")}</p>
                  <p className={css.locationRowValue}>kontakt@prefiz.pl</p>
                </div>
              </div>
              <div className={css.locationRow}>
                <Phone size={22} className={css.locationRowIcon} />
                <div>
                  <p className={css.locationRowLabel}>{t("location.phoneLabel")}</p>
                  <p className={css.locationRowValue}>+48 000 000 000</p>
                </div>
              </div>
            </div>

            <div className={css.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2399.123456789!2d18.0076!3d53.1235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703089a6e3f4b1f%3A0xa1234567890abcde!2sGarbary%202%2C%2085-229%20Bydgoszcz!5e0!3m2!1spl!2spl!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PreFiz location"
              />
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
            <Link href="/oferta" className={css.ctaBtnOutline}>
              {t("cta.btnOffer")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
