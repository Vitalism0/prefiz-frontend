import { http } from "../http";

export type RegistrationCreate = { name: string; phone: string };

export const registrationsApi = {
  create: (eventId: string, data: RegistrationCreate) =>
    http(`/events/${eventId}/registrations`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
