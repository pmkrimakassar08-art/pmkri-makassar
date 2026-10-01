import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 bg-background">{children}</main>
      <Footer />
    </div>
  );
}
