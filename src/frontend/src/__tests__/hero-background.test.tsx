import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/Hero";
import { SITE } from "@/lib/site";
import { renderWithProviders } from "./render-app";

// The contact section resolves its actor through this hook. A local typed mock
// keeps the whole page renderable without Internet Identity or a network.
const submitContactMessage = vi.fn();
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitContactMessage }, isFetching: false }),
}));

/**
 * The hero background is a photo layer plus a legibility overlay. The accepted
 * request only brightens the overlay, so these tests protect the composition
 * around it — the photo, the overlay layer, and the readable foreground — and
 * deliberately do not pin the overlay's old opacity values, which are the
 * behavior the request intentionally changes.
 */
describe("Hero background composition", () => {
  it("keeps the uploaded group photo as the hero background layer", () => {
    renderWithProviders(<Hero />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();

    const image = within(hero as HTMLElement).getByAltText(
      "Foto bersama anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    );
    expect(image).toHaveAttribute("src", SITE.hero);
    // The photo must stay a full-bleed cover layer behind the content.
    expect(image).toHaveClass("absolute", "inset-0", "object-cover");
  });

  it("keeps a decorative overlay layer above the photo for text legibility", () => {
    renderWithProviders(<Hero />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();

    // The overlay is decorative, so it is hidden from assistive tech; it is the
    // only aria-hidden element that carries the hero overlay utility class.
    const overlay = (hero as HTMLElement).querySelector(
      '[aria-hidden="true"].bg-hero-overlay',
    );
    expect(overlay).not.toBeNull();
    // It must sit above the photo (-z-10) and below the content.
    expect(overlay).toHaveClass("absolute", "inset-0", "-z-10");
  });

  it("keeps the hero title and calls to action readable above the background", () => {
    renderWithProviders(<Hero />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();
    const scope = within(hero as HTMLElement);

    expect(
      scope.getByRole("heading", { level: 1, name: SITE.name }),
    ).toBeInTheDocument();
    expect(
      scope.getByRole("button", { name: /Tentang Kami/ }),
    ).toBeInTheDocument();
    expect(
      scope.getByRole("button", { name: /Hubungi Kami/ }),
    ).toBeInTheDocument();
  });
});
