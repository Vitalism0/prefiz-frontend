import css from "./HeroSection.module.css";
import { Link } from "@/i18n/navigation";

export default function HeroSection() {
  return (
    <section className={css.hero}>
      <div className={css.overlay} />
      <div className={`${css.inner} container`}>
        <h1 className={css.title}>
          Nauka i technologia w <br /> fascynującej formie
        </h1>

        <p className={css.text}>
          Organizujemy pokazy fizyczne, warsztaty oraz kursy IT dla przedszkoli,
          szkół i młodzieży. Każde wydarzenie dopasowujemy do konkretnej grupy
          wiekowej i poziomu uczestników.
        </p>

        <div className={css.actions}>
          <Link href="/oferta" className={`btn btnPrimary ${css.btn}`}>
            Zobacz ofertę
          </Link>
          <Link href="/kalendarz" className={`btn btnSecondary ${css.btn}`}>
            Zapytaj o termin
          </Link>
        </div>
      </div>
    </section>
  );
}
