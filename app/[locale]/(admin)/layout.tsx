import type { ReactNode } from "react";
import { redirect } from "@/i18n/navigation";
import { getServerMe } from "@/lib/auth/server";
import { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

export default async function AdminLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const me = await getServerMe();

  if (!me || me.role !== "ADMIN") {
    redirect({ href: "/sign-in", locale: locale as Locale });
  }

  return <>{children}</>;
}
