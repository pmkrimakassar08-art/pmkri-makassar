import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      data-ocid="navbar"
      className={cn(
        "sticky top-0 z-50 border-b border-border/70 transition-smooth",
        isScrolled
          ? "bg-background/95 shadow-subtle backdrop-blur supports-[backdrop-filter]:bg-background/80"
          : "bg-background/80 backdrop-blur",
      )}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          data-ocid="navbar.logo_link"
          onClick={() => handleNavigate("beranda")}
          className="flex min-w-0 items-center gap-3 rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <img
            src={SITE.logo}
            alt={`Logo ${SITE.name}`}
            className="h-10 w-auto shrink-0 object-contain"
            width={40}
            height={40}
          />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-display text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {SITE.name}
            </span>
            <span className="hidden truncate text-xs text-muted-foreground sm:block">
              {SITE.subtitle}
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  data-ocid={`navbar.link.${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-smooth outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-smooth",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          data-ocid="navbar.menu_toggle"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isOpen}
          aria-controls="navbar-mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="text-foreground md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {isOpen ? (
        <div
          id="navbar-mobile-menu"
          data-ocid="navbar.mobile_menu"
          className="border-t border-border/70 bg-background md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-ocid={`navbar.mobile_link.${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium transition-smooth outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "bg-muted text-primary"
                        : "text-foreground/85 hover:bg-muted hover:text-primary",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-primary"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
