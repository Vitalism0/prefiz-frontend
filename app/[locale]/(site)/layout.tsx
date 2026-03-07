import type { ReactNode } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import InactivityGuard from "@/components/InactivityGuard/InactivityGuard";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <InactivityGuard />
      <Header />
      {children}
    </>
  );
}
