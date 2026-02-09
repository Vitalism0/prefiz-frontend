import css from "./OfferTilesSection.module.css";
import { Link } from "@/i18n/navigation";
import { FlaskConical, Code2, CalendarDays, User } from "lucide-react";

const tiles = [
  {
    icon: FlaskConical,
    title: "Warsztaty\nnaukowe",
    href: "/oferta/warsztaty",
  },
  { icon: Code2, title: "Kursy\nIT", href: "/oferta/kursy-it" },
  { icon: CalendarDays, title: "Pokazy\nfizyczne", href: "/oferta/pokazy" },
  { icon: User, title: "Zajęcia\nindywidualne", href: "/oferta/indywidualne" },
];

export default function OfferTilesSection() {
  return (
    <section className={css.section}>
      <div className="container">
        <h2 className={css.title}>Nasza oferta - Aktualności</h2>
        <p className={css.subtitle}>
          Sprawdź najnowsze informacje o pokazach, warsztatach i kursach IT.
          Publikujemy zapowiedzi wydarzeń, terminy zapisów oraz krótkie relacje
          z realizacji.
        </p>

        <div className={css.grid}>
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.href} href={t.href} className={css.card}>
                <Icon className={css.icon} />
                <h3 className={css.cardTitle}>
                  {t.title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>
                <p className={css.cardText}>
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
