import { ReactNode } from "react";
import { Navbar } from "@/components/web/layouts/Navbar";
import { Footer } from "@/components/web/layouts/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </>
  );
}
