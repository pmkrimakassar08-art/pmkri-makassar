import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "@/App";
import { SITE } from "@/lib/site";
import { renderWithProviders } from "./render-app";

// The contact section resolves its actor through this hook. A local typed mock
// keeps the whole page renderable without Internet Identity or a network.
const submitContactMessage = vi.fn();
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitContactMessage }, isFetching: false }),
}));

/**
 * Characterization baseline for the accepted organisation identity:
 * the full name plus the "Sanctus Albertus Magnus" subtitle must be visible in
 * the navbar, hero and footer. The request intentionally adds a "Cabang
 * Makassar" branch line beneath the name, so these tests assert the subtitle
 * text is present in each region without freezing the exact surrounding markup
 * or the number of lines in each block.
 */
describe("Organisation name and subtitle presentation", () => {
  it("keeps the accepted full name, subtitle and branch in the shared site config", () => {
    expect(SITE.name).toBe("Perhimpiunan Mahasiswa Katolik Republik Indonesia");
    expect(SITE.subtitle).toBe("Sanctus Albertus Magnus");
    expect(SITE.branch).toBe("Cabang Makassar");
    // PMKRI remains the accepted abbreviation.
    expect(SITE.tagline).toBe("PMKRI");
  });

  it("shows the full name and the subtitle in the navbar", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const navScope = within(nav);

    expect(navScope.getAllByText(SITE.name).length).toBeGreaterThan(0);
    expect(navScope.getAllByText(SITE.subtitle).length).toBeGreaterThan(0);
  });

  it("shows the full name as the hero heading and the subtitle beneath it", () => {
    renderWithProviders(<App />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();
    const heroScope = within(hero as HTMLElement);

    expect(
      heroScope.getByRole("heading", { level: 1, name: SITE.name }),
    ).toBeInTheDocument();
    expect(heroScope.getAllByText(SITE.subtitle).length).toBeGreaterThan(0);
    expect(heroScope.getAllByText(SITE.branch).length).toBeGreaterThan(0);
  });

  it("shows the full name and the subtitle in the footer", () => {
    renderWithProviders(<App />);

    const footer = screen.getByRole("contentinfo");
    const footerScope = within(footer);

    expect(footerScope.getAllByText(SITE.name).length).toBeGreaterThan(0);
    expect(footerScope.getAllByText(SITE.subtitle).length).toBeGreaterThan(0);
    expect(footerScope.getAllByText(SITE.branch).length).toBeGreaterThan(0);
  });

  it("never presents 'PMKRI Makassar' as the organisation name", () => {
    const { container } = renderWithProviders(<App />);

    expect(container.textContent ?? "").not.toContain("PMKRI Makassar");
  });
});
