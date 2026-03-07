import css from "./HeroSection.module.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className={css.hero}>
      <div className={css.overlay} />
      <div className={`${css.inner} container`}>
        <h1 className={css.title}>
          {t("title")
            .split("\n")
            .map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
        </h1>

        <p className={css.text}>{t("text")}</p>

        <div className={css.actions}>
          <Link href="/oferta" className={`btn btnPrimary ${css.btn}`}>
            {t("btnOffer")}
          </Link>
          <Link href="/kalendarz" className={`btn btnSecondary ${css.btn}`}>
            {t("btnBook")}
          </Link>
        </div>
      </div>
      <div className={css.scrollArrow} aria-hidden="true">
        <ChevronDown size={30} />
      </div>
    </section>
  );
}
