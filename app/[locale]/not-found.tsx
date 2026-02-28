"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Lightbulb, HardHat, ArrowLeft } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  const t = useTranslations("comingSoon");

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

      <div className={styles.brand}>
        <Lightbulb size={20} color="#0D99FF" />
        <span>PreFiz</span>
      </div>
    </div>
  );
}
