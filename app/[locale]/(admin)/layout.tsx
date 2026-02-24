"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { fetchMe } from "@/lib/kalendarz/adminApi";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const me = await fetchMe();
      if (!me || me.role !== "ADMIN") {
        router.push("/");
      }
    })();
  }, [router]);

  return <>{children}</>;
}
