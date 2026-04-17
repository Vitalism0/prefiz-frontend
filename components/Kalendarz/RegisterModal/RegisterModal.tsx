"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import css from "./RegisterModal.module.css";
import { registrationsApi } from "@/lib/kalendarz/registrationsApi";

type Props = {
  open: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle?: string;
};

export default function RegisterModal({
  open,
  onClose,
  eventId,
  eventTitle,
}: Props) {
  const t = useTranslations("register");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  if (!open) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await registrationsApi.create(eventId, { name, phone });
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      setStatus("error");
    }
  }

  function handleClose() {
    setStatus("idle");
    setError("");
    setName("");
    setPhone("");
    onClose();
  }

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <div>
            <h3 className={css.title}>{t("title")}</h3>
            {eventTitle ? <p className={css.subtitle}>{eventTitle}</p> : null}
          </div>

          <button type="button" className={css.closeBtn} onClick={handleClose}>
            ✕
          </button>
        </div>

        <div className={css.content}>
          {status === "success" ? (
            <div>
              <p className={css.success}>✅ {t("successMsg")}</p>
              <div className={css.actions}>
                <button
                  className={`${css.btn} ${css.primary}`}
                  onClick={handleClose}
                >
                  {t("close")}
                </button>
              </div>
            </div>
          ) : (
            <form className={css.form} onSubmit={onSubmit}>
              <label className={css.label}>
                {t("name")}
                <input
                  className={css.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  placeholder={t("namePlaceholder")}
                />
              </label>

              <label className={css.label}>
                {t("phone")}
                <input
                  className={css.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  minLength={6}
                  placeholder={t("phonePlaceholder")}
                />
              </label>

              {status === "error" ? <p className={css.error}>{error}</p> : null}

              <div className={css.actions}>
                <button
                  type="button"
                  className={css.btn}
                  onClick={handleClose}
                  disabled={status === "loading"}
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className={`${css.btn} ${css.primary}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? t("loading") : t("submit")}
                </button>
              </div>

              <p className={css.note}>{t("note")}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
