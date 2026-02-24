import type { CalendarEvent } from "./types";

export const mockEvents: CalendarEvent[] = [
  {
    id: "e1",
    title: "Nazwa",
    description: "Informacja o warsztacie",
    type: "warsztat",
    place: "ul. Główny 2",
    startAt: "2026-01-12T19:00:00",
    ageGroup: "7-10",
    imageUrl: "/images/hero/hero-1.jpg",
  },
  {
    id: "e2",
    title: "Nazwa",
    description: "Informacja o warsztacie",
    type: "warsztat",
    place: "ul. Główny 2",
    startAt: "2026-01-12T19:00:00",
    ageGroup: "11-14",
    imageUrl: "/images/hero/hero-1.jpg",
  },
  {
    id: "e3",
    title: "Nazwa",
    description: "Informacja o pokazie",
    type: "pokaz",
    place: "Centrum Nauki",
    startAt: "2026-01-18T17:30:00",
    ageGroup: "11-14",
    imageUrl: "/images/hero/hero-2.jpg",
  },
  {
    id: "e4",
    title: "Nazwa",
    description: "Informacja o kursie IT",
    type: "kurs_it",
    place: "Online",
    startAt: "2026-01-21T18:00:00",
    ageGroup: "15+",
    imageUrl: "/images/hero/hero-3.jpg",
  },
];
