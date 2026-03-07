"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import css from "./ReviewsSection.module.css";

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (target === "reviews") {
      sessionStorage.removeItem("scrollTo");
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#reviews") {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const reviews = [
    { name: t("r1.name"), text: t("r1.text"), rating: 5 },
    { name: t("r2.name"), text: t("r2.text"), rating: 4 },
    { name: t("r3.name"), text: t("r3.text"), rating: 5 },
    { name: t("r4.name"), text: t("r4.text"), rating: 4 },
    { name: t("r5.name"), text: t("r5.text"), rating: 5 },
    { name: t("r6.name"), text: t("r6.text"), rating: 4 },
  ];

  function getStep() {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.children[0] as HTMLElement | null;
    return card ? card.offsetWidth + 16 : 0;
  }

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * getStep(), behavior: "smooth" });
    setActiveIndex(index);
  }

  function scroll(dir: 1 | -1) {
    scrollTo(Math.max(0, Math.min(reviews.length - 1, activeIndex + dir)));
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const step = getStep();
    if (step === 0) return;
    setActiveIndex(Math.round(track.scrollLeft / step));
  }

  return (
    <section className={`section ${css.section}`} id="reviews">
      <div className="container">
        <h2 className={css.title}>{t("title")}</h2>
        <p className={css.subtitle}>{t("subtitle")}</p>

        <div className={css.track} ref={trackRef} onScroll={handleScroll}>
          {reviews.map((r, i) => (
            <article key={i} className={css.card}>
              <div className={css.stars}>
                {Array.from({ length: 5 }, (_, s) => (
                  <span key={s} className={s < r.rating ? css.starOn : css.starOff}>
                    ★
                  </span>
                ))}
              </div>
              <p className={css.text}>{r.text}</p>
              <div className={css.name}>{r.name}</div>
            </article>
          ))}
        </div>

        <div className={css.controls}>
          <button
            className={css.arrow}
            onClick={() => scroll(-1)}
            disabled={activeIndex === 0}
            aria-label={t("prev")}
          >
            <ChevronLeft size={20} />
          </button>

          <div className={css.dots}>
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`${css.dot} ${i === activeIndex ? css.dotActive : ""}`}
                onClick={() => scrollTo(i)}
                aria-label={`${t("review")} ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={css.arrow}
            onClick={() => scroll(1)}
            disabled={activeIndex === reviews.length - 1}
            aria-label={t("next")}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
