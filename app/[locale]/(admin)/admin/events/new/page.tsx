"use client";

import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { createAdminEvent } from "@/lib/kalendarz/adminApi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

type EventFormData = {
  title: string;
  description: string;
  type: "warsztat" | "pokaz" | "kurs_it";
  place: string;
  ageGroup: string;
  startAt: string;
};

export default function AdminNewEventPage() {
  const router = useRouter();
  const t = useTranslations("adminEvent");

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        title: z
          .string()
          .min(3, t("errors.titleMin"))
          .max(120, t("errors.titleMax")),
        description: z
          .string()
          .min(10, t("errors.descMin"))
          .max(2000, t("errors.descMax")),
        type: z.enum(["warsztat", "pokaz", "kurs_it"]),
        place: z
          .string()
          .min(2, t("errors.placeMin"))
          .max(100, t("errors.placeMax")),
        ageGroup: z
          .string()
          .min(1, t("errors.ageGroupRequired"))
          .max(50, t("errors.ageGroupMax")),
        startAt: z
          .string()
          .min(1, t("errors.startAtRequired"))
          .refine((v) => new Date(v) > new Date(), t("errors.startAtFuture")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    setError(null);

    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("description", data.description);
      fd.append("type", data.type);
      fd.append("place", data.place);
      fd.append("ageGroup", data.ageGroup);
      fd.append("startAt", new Date(data.startAt).toISOString());

      if (file) {
        fd.append("image", file);
      } else {
        fd.append("imageUrl", "/images/hero/hero-1.jpg");
      }

      await createAdminEvent(fd);
      router.push("/kalendarz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  });

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{t("pageTitle")}</h1>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            {t("fields.title")}
            <input className={styles.input} {...register("title")} />
            {errors.title && (
              <span className={styles.err}>{errors.title.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.description")}
            <textarea
              className={styles.textarea}
              {...register("description")}
            />
            {errors.description && (
              <span className={styles.err}>{errors.description.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.type")}
            <select className={styles.input} {...register("type")}>
              <option value="warsztat">{t("types.warsztat")}</option>
              <option value="pokaz">{t("types.pokaz")}</option>
              <option value="kurs_it">{t("types.kurs_it")}</option>
            </select>
            {errors.type && (
              <span className={styles.err}>{errors.type.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.place")}
            <input className={styles.input} {...register("place")} />
            {errors.place && (
              <span className={styles.err}>{errors.place.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.ageGroup")}
            <input className={styles.input} {...register("ageGroup")} />
            {errors.ageGroup && (
              <span className={styles.err}>{errors.ageGroup.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.startAt")}
            <input
              className={styles.input}
              type="datetime-local"
              {...register("startAt")}
            />
            {errors.startAt && (
              <span className={styles.err}>{errors.startAt.message}</span>
            )}
          </label>

          <label className={styles.label}>
            {t("fields.image")}
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {error && <p className={styles.serverErr}>{error}</p>}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? t("submitting") : t("submit")}
          </button>
        </form>
      </div>
    </main>
  );
}
