"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "@/i18n/navigation";
import { authApi } from "./api";

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
] as const;

export function useInactivityLogout() {
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore — cookie may already be gone
    }
    router.replace("/sign-in");
  }, [router]);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT);
  }, [logout]);

  useEffect(() => {
    resetTimer();

    ACTIVITY_EVENTS.forEach((e) =>
      window.addEventListener(e, resetTimer, { passive: true }),
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const elapsed = Date.now() - lastActivityRef.current;
        if (elapsed >= INACTIVITY_TIMEOUT) {
          logout();
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT - elapsed);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      ACTIVITY_EVENTS.forEach((e) => window.removeEventListener(e, resetTimer));
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetTimer, logout]);
}
