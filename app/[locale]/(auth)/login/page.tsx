"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, me } from "@/lib/prefizApi";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import css from "./styles.module.css";

const Schema = z.object({
  email: z.string().email("Введи коректний email"),
  password: z.string().min(1, "Введи пароль"),
});

type FormValues = z.infer<typeof Schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("auth.adminLogin");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    me()
      .then((u) => {
        if (u.role === "ADMIN") {
          router.replace(`/${locale}/profile`);
        }
      })
      .catch(() => {});
  }, [router, locale]);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);

    try {
      const u = await login(values.email, values.password);

      if (u.role !== "ADMIN") {
        setServerError("Цей акаунт не є адміністратором.");
        return;
      }

      router.replace(`/${locale}/profile`);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Login error");
    }
  };

  return (
    <main className={css.page}>
      <div className={css.card}>
        <h1 className={css.title}>{t("title")}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <label className={css.label}>
            Email
            <input className={css.input} type="email" {...register("email")} />
            {errors.email && (
              <span className={css.err}>{errors.email.message}</span>
            )}
          </label>

          <label className={css.label}>
            Password
            <input
              className={css.input}
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className={css.err}>{errors.password.message}</span>
            )}
          </label>

          {serverError && <div className={css.serverErr}>{serverError}</div>}

          <button className={css.btn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("loading") : t("submit")}
          </button>
        </form>
      </div>
    </main>
  );
}
