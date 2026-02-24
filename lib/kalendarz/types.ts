export type EventType = "warsztat" | "pokaz" | "kurs_it";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  type: EventType;
  place: string;
  ageGroup: string;
  startAt: string;
  imageUrl: string;
  createdAt: string;
};
export type AdminRegistrationRow = {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  phone: string;
  createdAt: string;

  user: { id: string; email: string };
  event: {
    id: string;
    title: string;
    startAt: string;
    place: string;
    type: "warsztat" | "pokaz" | "kurs_it";
  };
};
