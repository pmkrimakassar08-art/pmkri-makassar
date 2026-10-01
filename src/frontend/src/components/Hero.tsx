import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function Hero() {
  return (
    <section
      id="beranda"
      data-ocid="hero.section"
      className="relative isolate flex min-h-[88vh] items-center overflow-hidden"
    >
      <img
        src={SITE.hero}
        alt="Foto bersama anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-hero-overlay"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-up [text-shadow:0_1px_2px_oklch(0.2_0.08_25/0.55),0_2px_12px_oklch(0.2_0.08_25/0.4)]">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {SITE.tagline}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            {SITE.name}
          </h1>
          <p className="mt-3 font-display text-xl italic text-primary sm:text-2xl">
            {SITE.subtitle}
          </p>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-foreground/85 sm:text-base">
            {SITE.branch}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            Bersama membangun generasi mahasiswa Katolik yang beriman, berilmu,
            dan berdaya bagi Gereja, masyarakat, dan bangsa Indonesia.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              size="lg"
              data-ocid="hero.about_button"
              onClick={() => scrollToSection("tentang-kami")}
              className="rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-elevated transition-smooth hover:bg-primary/90 hover:shadow-elevated-hover"
            >
              Tentang Kami
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              data-ocid="hero.contact_button"
              onClick={() => scrollToSection("kontak")}
              className="rounded-full border-primary/50 bg-transparent px-7 text-base font-semibold text-foreground transition-smooth hover:bg-primary/10 hover:text-primary"
            >
              <Mail aria-hidden="true" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
