import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { galleryPhotos } from "@/lib/gallery";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { renderWithProviders } from "./render-app";

// The contact section resolves its actor through this hook. A local typed mock
// keeps the whole page renderable without Internet Identity or a network.
const submitContactMessage = vi.fn();
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitContactMessage }, isFetching: false }),
}));

beforeEach(() => {
  submitContactMessage.mockReset();
});

describe("Perhimpiunan Mahasiswa Katolik Republik Indonesia landing page", () => {
  it("sets the browser tab title to the full organisation name", () => {
    // Vitest runs with the frontend package as its working directory.
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

    expect(title).toContain(
      "Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    );
    expect(title).not.toContain("PMKRI Makassar");
  });

  it("renders the main route without an empty screen", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: SITE.name }),
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows exactly the four accepted navigation menus", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const labels = within(nav)
      .getAllByRole("button")
      .map((button) => button.textContent?.trim())
      .filter((label): label is string => Boolean(label));

    // The logo button is also a button; the four menu labels are the accepted set.
    const menuLabels = labels.filter((label) =>
      NAV_ITEMS.some((item) => item.label === label),
    );
    expect(menuLabels).toEqual(["Beranda", "Tentang Kami", "Kontak", "Galeri"]);
    expect(NAV_ITEMS).toHaveLength(4);
  });

  it("renders the logo in the navbar with a descriptive alt text", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const logo = within(nav).getByAltText(`Logo ${SITE.name}`);
    expect(logo).toHaveAttribute("src", SITE.logo);
  });

  it("uses the same shared logo source in the navbar and the footer", () => {
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    const footer = screen.getByRole("contentinfo");

    const navLogo = within(nav).getByAltText(`Logo ${SITE.name}`);
    const footerLogo = within(footer).getByAltText(`Logo ${SITE.name}`);

    // Both placements must track the single SITE.logo constant, so changing the
    // asset (e.g. to a transparent version) updates both at once.
    expect(navLogo).toHaveAttribute("src", SITE.logo);
    expect(footerLogo).toHaveAttribute("src", SITE.logo);
    expect(navLogo.getAttribute("src")).toBe(footerLogo.getAttribute("src"));
  });

  it("shows the uploaded group photo as the hero background with a readable title", () => {
    renderWithProviders(<App />);

    const heroImage = screen.getByAltText(
      "Foto bersama anggota Perhimpiunan Mahasiswa Katolik Republik Indonesia",
    );
    expect(heroImage).toHaveAttribute("src", SITE.hero);
    expect(
      screen.getByRole("heading", { level: 1, name: SITE.name }),
    ).toBeInTheDocument();
  });

  it("presents the profile, vision, mission and officer cards in Tentang Kami", () => {
    renderWithProviders(<App />);

    const about = document.getElementById("tentang-kami");
    expect(about).not.toBeNull();
    const aboutScope = within(about as HTMLElement);

    expect(aboutScope.getByText("Visi")).toBeInTheDocument();
    expect(aboutScope.getByText("Misi")).toBeInTheDocument();
    expect(
      aboutScope.getAllByText(
        /Perhimpiunan Mahasiswa Katolik Republik Indonesia/,
      ).length,
    ).toBeGreaterThan(0);

    // Officer cards are keyed by data-ocid; assert a representative set.
    expect(aboutScope.getByText("Yohanes Baptista")).toBeInTheDocument();
    expect(aboutScope.getByText("Ketua Presidium")).toBeInTheDocument();
    expect(aboutScope.getByText("Maria Angelica")).toBeInTheDocument();
  });

  it("renders the gallery grid with every photo", () => {
    renderWithProviders(<App />);

    const gallery = document.getElementById("galeri");
    expect(gallery).not.toBeNull();
    const galleryScope = within(gallery as HTMLElement);

    for (const photo of galleryPhotos) {
      expect(galleryScope.getByText(photo.title)).toBeInTheDocument();
    }
  });

  it("shows the full organisation name in the navbar, hero, about, contact and gallery", () => {
    renderWithProviders(<App />);

    const fullName = "Perhimpiunan Mahasiswa Katolik Republik Indonesia";

    // Navbar (menu atas) and hero (beranda) both carry the full name.
    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    expect(within(nav).getAllByText(fullName).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { level: 1, name: fullName }),
    ).toBeInTheDocument();

    // Tentang Kami, Kontak and Galeri sections each mention the full name.
    for (const sectionId of ["tentang-kami", "kontak", "galeri"]) {
      const section = document.getElementById(sectionId);
      expect(section).not.toBeNull();
      expect(
        within(section as HTMLElement).getAllByText(new RegExp(fullName))
          .length,
      ).toBeGreaterThan(0);
    }
  });

  it("keeps PMKRI as the accepted abbreviation", () => {
    renderWithProviders(<App />);

    // The abbreviation remains in use (hero badge and about prose), while the
    // full name is what identifies the organisation.
    expect(screen.getAllByText("PMKRI").length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        /Perhimpiunan Mahasiswa Katolik Republik Indonesia \(PMKRI\)/,
      ),
    ).toBeInTheDocument();
  });

  it("no longer presents 'PMKRI Makassar' as the organisation name", () => {
    const { container } = renderWithProviders(<App />);

    // The old name must not appear anywhere in the rendered page.
    expect(container.textContent ?? "").not.toContain("PMKRI Makassar");
  });

  it("uses the new organisation name in image alt text and social labels", () => {
    renderWithProviders(<App />);

    const fullName = "Perhimpiunan Mahasiswa Katolik Republik Indonesia";

    // Hero background alt text.
    expect(
      screen.getByAltText(`Foto bersama anggota ${fullName}`),
    ).toBeInTheDocument();

    // Gallery photo alt text.
    for (const photo of galleryPhotos) {
      expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
      expect(photo.alt).toContain(fullName);
    }

    // Social media labels in the contact section.
    const contact = document.getElementById("kontak");
    expect(contact).not.toBeNull();
    const contactScope = within(contact as HTMLElement);
    for (const network of ["Instagram", "Facebook", "WhatsApp"]) {
      expect(
        contactScope.getByLabelText(`${network} ${fullName}`),
      ).toBeInTheDocument();
    }
  });

  it("renders the footer with logo, organisation name, menu links and copyright", () => {
    renderWithProviders(<App />);

    const footer = screen.getByRole("contentinfo");
    const footerScope = within(footer);

    expect(footerScope.getByAltText(`Logo ${SITE.name}`)).toHaveAttribute(
      "src",
      SITE.logo,
    );
    expect(footerScope.getAllByText(SITE.name).length).toBeGreaterThan(0);
    for (const item of NAV_ITEMS) {
      expect(
        footerScope.getByRole("button", { name: item.label }),
      ).toBeInTheDocument();
    }
    expect(
      footerScope.getByText(/Seluruh hak cipta dilindungi/),
    ).toBeInTheDocument();
  });
});
