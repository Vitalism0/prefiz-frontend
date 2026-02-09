import css from "./Footer.module.css";
import { Link } from "@/i18n/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Lightbulb,
} from "lucide-react";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.card}>
          <div className={css.left}>
            <div className={css.brandRow}>
              <span className={css.logo}>
                <Lightbulb color="#0D99FF" size={40} />
              </span>
              <span className={css.brand}>PreFiz</span>
            </div>

            <p className={css.desc}>
              Otrzymuj informacje o nowych pokazach, warsztatach, kursach IT
              oraz wydarzeniach sezonowych.
            </p>

            <NewsletterForm />

            <p className={css.note}>
              Zapisując się, akceptujesz naszą Politykę prywatności i wyrażasz
              zgodę na otrzymywanie wiadomości.
            </p>

            <p className={css.copy}>
              © {new Date().getFullYear()} PreFiz. Wszelkie prawa zastrzeżone.
            </p>
          </div>

          <div className={css.right}>
            <div className={css.col}>
              <h3 className={css.colTitle}>Szybkie linki</h3>
              <ul className={css.list}>
                <li>
                  <Link className={css.link} href="/o-nas">
                    O nas
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/faq">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/kontakt">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link className={css.link} href="/projekty">
                    Zrealizowane projekty
                  </Link>
                </li>
              </ul>
            </div>

            <div className={css.col}>
              <h3 className={css.colTitle}>Znajdź nas</h3>
              <ul className={css.list}>
                <li>
                  <a className={css.social} href="#" aria-label="Facebook">
                    <Facebook size={16} />
                    Facebook
                  </a>
                </li>
                <li>
                  <a className={css.social} href="#" aria-label="Instagram">
                    <Instagram size={16} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a className={css.social} href="#" aria-label="LinkedIn">
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className={css.social} href="#" aria-label="YouTube">
                    <Youtube size={16} />
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
