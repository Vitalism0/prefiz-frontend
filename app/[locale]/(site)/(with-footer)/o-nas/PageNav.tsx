"use client";

import { useState, useEffect } from "react";
import css from "./page.module.css";

interface NavItem {
  id: string;
  label: string;
}

export default function PageNav({ items }: { items: NavItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className={css.pageNav} aria-label="Page navigation">
      <div className={`${css.pageNavInner} container`}>
        {items.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${css.pageNavLink} ${activeId === id ? css.pageNavLinkActive : ""}`}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
