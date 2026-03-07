"use client";

import { useInactivityLogout } from "@/lib/auth/useInactivityLogout";

export default function InactivityTimer() {
  useInactivityLogout();
  return null;
}
