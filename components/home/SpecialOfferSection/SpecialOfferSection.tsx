import css from "./SpecialOfferSection.module.css";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function SpecialOfferSection() {
  return (
    <section className="section">
      <div className="container">
        <div className={css.banner}>
          <div className={css.left}>
            <h2 className={css.title}>
              Oferta specjalna - <br /> kalendarz pokazów sezonowych
            </h2>
            <p className={css.text}>
              W tej sekcji znajdziesz sezonowe pokazy i warsztaty przygotowane
              na różne okazje w ciągu roku (np. ferie, wakacje, Halloween czy
              okres świąteczny). Każda propozycja ma jasno opisany temat, format
              oraz dokładnie wskazaną grupę wiekową, dzięki czemu łatwo
              dopasujesz wydarzenie do poziomu uczestników. Sprawdź dostępne
              terminy i wybierz najlepszą opcję dla swojej grupy.
            </p>

            <Link href="/kalendarz" className={`btn btnPrimary ${css.btn}`}>
              Zobacz kalendarz wydarzeń
            </Link>
          </div>

          <div className={css.right}>
            <Image
              src="/images/hero/special-calendar.jpg"
              alt="Kalendarz wydarzeń"
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
