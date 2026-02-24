"use client";

import { useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import { authApi } from "@/lib/auth/api";
import { getErrorMessage } from "@/lib/auth/getErrorMessage";
import css from "./SignIn.module.css";

export default function SignInPage() {
  const router = useRouter();
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
        <h1 className={css.title}>Sign in</h1>
        <p className={css.subtitle}>Welcome back! Please enter your details.</p>

        <form onSubmit={onSubmit} className={css.form}>
          <div className={css.field}>
            <label className={css.label}>Email</label>
            <input
              className={css.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label}>Password</label>
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
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className={css.footer}>
          No account yet?{" "}
          <Link href="/sign-up" className={css.link}>
            Sign up
          </Link>
        </div>
      </section>
    </main>
  );
}
