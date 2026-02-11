import css from "./SpecialOfferSection.module.css";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SpecialOfferSection() {
  const t = useTranslations("specialOffer");

  return (
    <section className="section">
      <div className="container">
        <div className={css.banner}>
          <div className={css.left}>
            <h2 className={css.title}>
              {t("title")
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </h2>

            <p className={css.text}>{t("text")}</p>

            <Link href="/kalendarz" className={`btn btnPrimary ${css.btn}`}>
              {t("btn")}
            </Link>
          </div>

          <div className={css.right}>
            <Image
              src="/images/hero/special-calendar.jpg"
              alt={t("imageAlt")}
              width={420}
              height={260}
              className={css.img}
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
