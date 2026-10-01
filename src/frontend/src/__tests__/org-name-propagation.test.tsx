import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
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
 * The accepted request renames the organisation string. These tests deliberately
 * read the name from the single `SITE.name` constant instead of pinning either
 * the old or the new literal, so they protect the propagation contract — one
 * source of truth reaching the navbar, hero, footer and page title — rather than
 * freezing the string the request intentionally changes.
 */
describe("Organisation name propagation", () => {
  it("keeps the full name and the PMKRI abbreviation in the shared site config", () => {
    expect(typeof SITE.name).toBe("string");
    expect(SITE.name.trim().length).toBeGreaterThan(0);
    // PMKRI is the accepted abbreviation and must not be renamed away.
    expect(SITE.tagline).toBe("PMKRI");
  });

  it("uses the accepted spelling of the organisation name", () => {
    // The accepted request fixes the exact spelling, including the "Perhimpiunan"
    // form, so this pins the literal rather than only its propagation.
    expect(SITE.name).toBe("Perhimpiunan Mahasiswa Katolik Republik Indonesia");
  });

  it("no longer contains the previous spelling anywhere in the frontend sources", () => {
    // The old spelling must be fully replaced across the frontend source tree,
    // not just in the rendered page.
    const frontendRoot = resolve(process.cwd(), "src");
    const oldSpelling = "Perhimpunan Mahasiswa Katolik Republik Indonesia";

    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) {
          // Test files legitimately name the old spelling to assert its absence.
          if (entry.name === "__tests__") continue;
          walk(full);
        } else if (/\.(ts|tsx|html)$/.test(entry.name)) {
          if (readFileSync(full, "utf8").includes(oldSpelling)) {
            offenders.push(full);
          }
        }
      }
    };
    walk(frontendRoot);

    expect(offenders).toEqual([]);
  });

  it("shows the shared name in the navbar", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    expect(within(nav).getAllByText(SITE.name).length).toBeGreaterThan(0);
    // The logo alt text is derived from the same constant.
    expect(within(nav).getByAltText(`Logo ${SITE.name}`)).toBeInTheDocument();
  });

  it("shows the shared name as the hero heading", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: SITE.name }),
    ).toBeInTheDocument();
  });

  it("shows the shared name in the footer", () => {
    renderWithProviders(<App />);

    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getAllByText(SITE.name).length).toBeGreaterThan(0);
    expect(
      within(footer).getByAltText(`Logo ${SITE.name}`),
    ).toBeInTheDocument();
  });

  it("uses the shared name in the browser tab title", () => {
    // Vitest runs with the frontend package as its working directory.
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

    expect(title).toContain(SITE.name);
  });

  it("does not present 'PMKRI Makassar' as the organisation name", () => {
    const { container } = renderWithProviders(<App />);

    expect(container.textContent ?? "").not.toContain("PMKRI Makassar");
  });
});
