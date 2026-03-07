import css from "./CtaSection.module.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className={css.section}>
      <div className={`${css.inner} container`}>
        <h2 className={css.title}>{t("title")}</h2>
        <p className={css.subtitle}>{t("subtitle")}</p>
        <div className={css.actions}>
          <Link href="/kontakt" className={`btn btnPrimary ${css.btn}`}>
            {t("btnContact")}
          </Link>
          <Link href="/oferta" className={css.btnOutline}>
            {t("btnOffer")}
          </Link>
        </div>
      </div>
    </section>
  );
}
