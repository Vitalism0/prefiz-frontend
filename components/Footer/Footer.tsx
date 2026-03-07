import css from "./Footer.module.css";
import { Link } from "@/i18n/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Lightbulb,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.card}>
          <div className={css.left}>
            <div className={css.brandRow}>
              <span className={css.logo}>
                <Lightbulb color="#0D99FF" size={40} />
              </span>
              <span className={css.brand}>PreFiz</span>
            </div>

            <p className={css.desc}>{t("desc")}</p>

            <NewsletterForm />

            <p className={css.note}>{t("note")}</p>

            <p className={css.copy}>
              © {new Date().getFullYear()} PreFiz. {t("rights")}
            </p>
          </div>

          <div className={css.right}>
            <div className={css.col}>
              <h3 className={css.colTitle}>{t("quickLinks")}</h3>
              <ul className={css.list}>
                <li>
                  <Link className={css.link} href="/o-nas">
                    {t("links.about")}
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/#faq">
                    {t("links.faq")}
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/kontakt">
                    {t("links.contact")}
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/projekty">
                    {t("links.projects")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className={css.col}>
              <h3 className={css.colTitle}>{t("findUs")}</h3>
              <ul className={css.list}>
                <li>
                  <a
                    className={css.social}
                    href="#"
                    aria-label={t("social.facebook")}
                  >
                    <Facebook size={16} />
                    {t("social.facebook")}
                  </a>
                </li>
                <li>
                  <a
                    className={css.social}
                    href="#"
                    aria-label={t("social.instagram")}
                  >
                    <Instagram size={16} />
                    {t("social.instagram")}
                  </a>
                </li>
                <li>
                  <a
                    className={css.social}
                    href="#"
                    aria-label={t("social.linkedin")}
                  >
                    <Linkedin size={16} />
                    {t("social.linkedin")}
                  </a>
                </li>
                <li>
                  <a
                    className={css.social}
                    href="#"
                    aria-label={t("social.youtube")}
                  >
                    <Youtube size={16} />
                    {t("social.youtube")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
