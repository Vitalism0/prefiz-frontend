"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { authApi } from "@/lib/auth/api";
import { getErrorMessage } from "@/lib/auth/getErrorMessage";
import css from "./SignIn.module.css";

export default function SignInPage() {
  const router = useRouter();
  const t = useTranslations("auth.signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authApi.login({ email, password });

      // ✅ і USER, і ADMIN йдуть на профіль
      router.replace("/profile");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={css.wrapper}>
      <section className={css.card}>
        <h1 className={css.title}>{t("title")}</h1>
        <p className={css.subtitle}>{t("subtitle")}</p>

        <form onSubmit={onSubmit} className={css.form}>
          <div className={css.field}>
            <label className={css.label}>{t("email")}</label>
            <input
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>{t("password")}</label>
            <input
              className={css.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          {error && <div className={css.error}>{error}</div>}

          <button className={css.button} type="submit" disabled={loading}>
            {loading ? t("loading") : t("submit")}
          </button>
        </form>

        <div className={css.footer}>
          {t("noAccount")}{" "}
          <Link href="/sign-up" className={css.link}>
            {t("signUpLink")}
          </Link>
        </div>
      </section>
    </main>
  );
}
