"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import css from "./FaqSection.module.css";

export default function FaqSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target === "faq") {
      sessionStorage.removeItem("scrollTo");
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#faq") {
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className={css.section} id="faq">
      <div className={`${css.inner} container`}>
        <h2 className={css.title}>{t("title")}</h2>
        <p className={css.subtitle}>{t("subtitle")}</p>

        <div className={css.list}>
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={`${css.item} ${isOpen ? css.itemOpen : ""}`}>
                <button
                  type="button"
                  className={css.question}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`${css.chevron} ${isOpen ? css.chevronOpen : ""}`}
                  />
                </button>
                <div className={css.answerWrap} style={{ maxHeight: isOpen ? "600px" : "0" }}>
                  <p className={css.answer}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
