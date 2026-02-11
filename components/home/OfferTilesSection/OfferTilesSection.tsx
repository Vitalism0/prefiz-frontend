import css from "./OfferTilesSection.module.css";
import { Link } from "@/i18n/navigation";
import { FlaskConical, Code2, CalendarDays, User } from "lucide-react";
import { useTranslations } from "next-intl";

const tiles = [
  { icon: FlaskConical, href: "/oferta/warsztaty", key: "tile1" },
  { icon: Code2, href: "/oferta/kursy-it", key: "tile2" },
  { icon: CalendarDays, href: "/oferta/pokazy", key: "tile3" },
  { icon: User, href: "/oferta/indywidualne", key: "tile4" },
] as const;

export default function OfferTilesSection() {
  const tr = useTranslations("offerTiles");

  return (
    <section className={css.section}>
      <div className="container">
        <h2 className={css.title}>{tr("title")}</h2>
        <p className={css.subtitle}>{tr("subtitle")}</p>

        <div className={css.grid}>
          {tiles.map((tile) => {
            const Icon = tile.icon;
            const title = tr(tile.key);

            return (
              <Link key={tile.href} href={tile.href} className={css.card}>
                <Icon className={css.icon} />
                <h3 className={css.cardTitle}>
                  {title.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h3>

                <p className={css.cardText}>{tr("cardText")}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
