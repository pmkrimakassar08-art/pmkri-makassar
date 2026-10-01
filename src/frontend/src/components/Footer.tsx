import { Mail, MapPin, Phone } from "lucide-react";

import { NAV_ITEMS, SITE } from "@/lib/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer
      data-ocid="footer"
      className="border-t border-border/70 bg-card text-card-foreground"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src={SITE.logo}
              alt={`Logo ${SITE.name}`}
              className="h-14 w-auto object-contain"
              width={56}
              height={56}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-semibold text-foreground">
                {SITE.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {SITE.subtitle}
              </span>
              <span className="text-sm text-muted-foreground">
                {SITE.branch}
              </span>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {SITE.tagline}. Wadah pembinaan iman, intelektual, dan pengabdian
            mahasiswa Katolik di Kota Makassar.
          </p>
        </div>

        <nav aria-label="Tautan footer" className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Menu
          </h2>
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-ocid={`footer.link.${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  className="rounded-sm text-sm text-muted-foreground transition-smooth outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Sekretariat
          </h2>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-accent"
              />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              <a
                href={`tel:${SITE.phone.replace(/[^0-9+]/g, "")}`}
                className="rounded-sm transition-smooth outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail
                aria-hidden="true"
                className="size-4 shrink-0 text-accent"
              />
              <a
                href={`mailto:${SITE.email}`}
                className="min-w-0 break-all rounded-sm transition-smooth outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-muted-foreground sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            &copy; {currentYear} {SITE.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>
            Dibuat dengan penuh kasih menggunakan{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm font-medium text-primary underline-offset-4 transition-smooth outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
