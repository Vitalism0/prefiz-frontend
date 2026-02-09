import { Link } from "@/i18n/navigation";
import { Lightbulb } from "lucide-react";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslations } from "next-intl";
import css from "./Header.module.css";

export default function Header() {
  const t = useTranslations("header");
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
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
