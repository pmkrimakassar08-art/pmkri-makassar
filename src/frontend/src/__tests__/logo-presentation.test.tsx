import { readFileSync } from "node:fs";
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

// Vitest runs with the frontend package as its working directory, so the
// public asset resolves relative to it.
const LOGO_PATH = resolve(
  process.cwd(),
  "public/assets/logo-pmkri-makassar.png",
);

type PngHeader = {
  width: number;
  height: number;
  bitDepth: number;
  colorType: number;
};

/** Reads the IHDR chunk of a PNG without any image-decoding dependency. */
function readPngHeader(bytes: Buffer): PngHeader {
  const signature = bytes.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("Asset is not a PNG file");
  }
  // The first chunk after the 8-byte signature is always IHDR.
  const type = bytes.subarray(12, 16).toString("ascii");
  if (type !== "IHDR") {
    throw new Error(`Expected IHDR as first chunk, got ${type}`);
  }
  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    bitDepth: bytes[24],
    colorType: bytes[25],
  };
}

describe("PMKRI Makassar logo presentation", () => {
  it("ships a transparent PNG asset rather than one with a white background", () => {
    const header = readPngHeader(readFileSync(LOGO_PATH));

    // PNG color type 6 is truecolour with an alpha channel; type 4 is
    // greyscale with alpha. Either carries per-pixel transparency, so the
    // maroon page background shows through instead of a white plate.
    expect([4, 6]).toContain(header.colorType);
    expect(header.bitDepth).toBe(8);
    expect(header.width).toBeGreaterThan(0);
    expect(header.height).toBeGreaterThan(0);
  });

  it("keeps the logo square so its aspect ratio is preserved", () => {
    const header = readPngHeader(readFileSync(LOGO_PATH));

    expect(header.width).toBe(header.height);
  });

  it("renders the logo in the navbar and footer with object-contain and no white background", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const footer = screen.getByRole("contentinfo");

    const navLogo = within(nav).getByAltText(`Logo ${SITE.name}`);
    const footerLogo = within(footer).getByAltText(`Logo ${SITE.name}`);

    for (const logo of [navLogo, footerLogo]) {
      // `object-contain` scales the image inside its box without cropping or
      // stretching it, which is what keeps the aspect ratio intact.
      expect(logo).toHaveClass("object-contain");
      // No opaque white plate behind the logo; the maroon background shows.
      expect(logo.className).not.toMatch(/\bbg-white\b/);
      expect(logo.className).not.toMatch(/\bbg-background\b/);
    }
  });

  it("declares intrinsic width and height on both logo placements", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const footer = screen.getByRole("contentinfo");

    const navLogo = within(nav).getByAltText(`Logo ${SITE.name}`);
    const footerLogo = within(footer).getByAltText(`Logo ${SITE.name}`);

    for (const logo of [navLogo, footerLogo]) {
      const width = Number(logo.getAttribute("width"));
      const height = Number(logo.getAttribute("height"));
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      // Intrinsic dimensions must match the square asset so the browser does
      // not reserve a distorted box before the image loads.
      expect(width).toBe(height);
    }
  });
});
