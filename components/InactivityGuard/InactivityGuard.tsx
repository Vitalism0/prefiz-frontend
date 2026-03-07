"use client";

import { useEffect, useState } from "react";
import { authApi } from "@/lib/auth/api";
import InactivityTimer from "./InactivityTimer";

export default function InactivityGuard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authApi
      .me()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (!isLoggedIn) return null;

  return <InactivityTimer />;
}
