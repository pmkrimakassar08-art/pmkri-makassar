import { readFileSync } from "node:fs";
import { resolve } from "node:path";
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

// Vitest runs with the frontend package as its working directory.
const CSS_PATH = resolve(process.cwd(), "src/index.css");

/**
 * The accepted request brightens the hero: the dark overlay above the photo is
 * reduced so the photo shows through, while the title and buttons stay legible
 * and the maroon base is untouched. These tests assert that accepted change
 * without pinning the exact old opacity values.
 */
describe("Hero overlay brightness", () => {
  it("reduces the dark overlay so the background photo is not covered by a dense layer", () => {
    const css = readFileSync(CSS_PATH, "utf8");

    // The overlay is a gradient of oklch(... / <alpha>) stops. Every stop must
    // stay translucent enough that the photo remains visible underneath.
    const overlayBlock = css.match(
      /--gradient-hero-overlay:\s*linear-gradient\(([\s\S]*?)\);/,
    );
    expect(overlayBlock).not.toBeNull();

    const alphas = [
      ...(overlayBlock as RegExpMatchArray)[1].matchAll(/\/\s*([0-9.]+)\s*\)/g),
    ].map((match) => Number(match[1]));

    expect(alphas.length).toBeGreaterThan(0);
    // A dense layer would sit at or near full opacity; the accepted change keeps
    // every stop clearly below that so the photo reads through.
    for (const alpha of alphas) {
      expect(alpha).toBeLessThan(0.7);
    }
  });

  it("keeps the photo as a full-bleed layer beneath the overlay", () => {
    renderWithProviders(<Hero />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();
    const scope = within(hero as HTMLElement);

    const image = scope.getByAltText(
      "Foto bersama anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    );
    expect(image).toHaveAttribute("src", SITE.hero);
    expect(image).toHaveClass("absolute", "inset-0", "object-cover");
  });

  it("keeps the title and calls to action legible above the brighter background", () => {
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

    // The hero copy carries a text shadow so it stays readable over the photo
    // now that the overlay is lighter.
    const copy = scope
      .getByRole("heading", { level: 1, name: SITE.name })
      .closest("div");
    expect(copy?.className).toMatch(/text-shadow/);
  });

  it("keeps the maroon base colour and the hero layout unchanged", () => {
    const css = readFileSync(CSS_PATH, "utf8");

    // The base background stays a maroon hue (oklch hue ~25) rather than being
    // lightened along with the overlay.
    const background = css.match(
      /--background:\s*([0-9.]+)\s+([0-9.]+)\s+(\d+)/,
    );
    expect(background).not.toBeNull();
    expect(Number((background as RegExpMatchArray)[3])).toBe(25);

    renderWithProviders(<Hero />);
    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();
    // The hero keeps its structural layout classes.
    expect(hero).toHaveClass(
      "relative",
      "isolate",
      "flex",
      "min-h-[88vh]",
      "items-center",
      "overflow-hidden",
    );
  });

  it("keeps the hero copy in Indonesian", () => {
    renderWithProviders(<Hero />);

    const hero = document.getElementById("beranda");
    expect(hero).not.toBeNull();
    const scope = within(hero as HTMLElement);

    expect(
      scope.getByText(/Bersama membangun generasi mahasiswa Katolik/),
    ).toBeInTheDocument();
    expect(
      scope.getByRole("button", { name: /Hubungi Kami/ }),
    ).toBeInTheDocument();
  });
});
