import { http } from "../http";

export type RegistrationCreate = { name: string; phone: string };

export type MyRegistration = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    type: "warsztat" | "pokaz" | "kurs_it";
    place: string;
    startAt: string;
    imageUrl: string;
  };
};

export const registrationsApi = {
  create: (eventId: string, data: RegistrationCreate) =>
    http(`/events/${eventId}/registrations`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMyRegistrations: () =>
    http<MyRegistration[]>("/events/my-registrations"),
};
