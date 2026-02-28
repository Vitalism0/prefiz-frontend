import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HardHat, ArrowLeft } from "lucide-react";
import styles from "@/app/[locale]/not-found.module.css";

export default async function CatchAllPage() {
  const t = await getTranslations("comingSoon");

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <HardHat size={48} strokeWidth={1.5} className={styles.icon} />
        </div>

        <span className={styles.label}>{t("label")}</span>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.desc}>{t("desc")}</p>

        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} />
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
