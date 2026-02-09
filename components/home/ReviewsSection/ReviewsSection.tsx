import css from "./ReviewsSection.module.css";

const reviews = [
  {
    name: "Marek Nowak",
    text: "Świetny pokaz fizyczny — dzieci były zachwycone! Dynamika i bardzo angażujące doświadczenia.",
  },
  {
    name: "Anna Kowalska",
    text: "Zamówiliśmy warsztaty i termin udało się ustalić bardzo szybko. Prowadzący miło i merytorycznie.",
  },
  {
    name: "Katarzyna Wiśniewska",
    text: "Kurs IT prowadzony profesjonalnie. Dziecko zrobiło duży progres i jest zmotywowane.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className={css.title}>Opinie klientów</h2>
        <p className={css.subtitle}>
          Zobacz, co mówią placówki i rodzice o naszych pokazach, warsztatach
          oraz kursach IT. Każde zajęcia dopasowujemy do wieku uczestników i
          poziomu grupy.
        </p>

        <div className={css.grid}>
          {reviews.map((r) => (
            <article key={r.name} className={css.card}>
              <div className={css.stars}>★★★★★</div>
              <p className={css.text}>{r.text}</p>
              <div className={css.name}>{r.name}</div>
            </article>
          ))}
        </div>

        <div className={css.controls}>
          <button className={css.arrow} aria-label="Previous">
            ‹
          </button>
          <button className={css.arrow} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
