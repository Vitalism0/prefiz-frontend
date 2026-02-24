import type { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";

export default function WithFooterLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
