"use client";

import css from "./Footer.module.css";

export default function NewsletterForm() {
  return (
    <form className={css.form} onSubmit={(e) => e.preventDefault()}>
      <input
        className={css.input}
        type="email"
        placeholder="Twój e-mail"
        aria-label="Twój e-mail"
      />
      <button className={css.button} type="submit">
        Zapisz się
      </button>
    </form>
  );
}
