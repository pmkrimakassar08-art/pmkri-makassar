import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { GallerySection } from "@/components/GallerySection";
import { galleryPhotos } from "@/lib/gallery";
import { renderWithProviders } from "./render-app";

describe("GallerySection lightbox", () => {
  it("opens a large preview when a photo is clicked and closes it again", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GallerySection />);

    const first = galleryPhotos[0];
    await user.click(
      screen.getByRole("button", {
        name: `Buka pratinjau foto: ${first.title}`,
      }),
    );

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      within(dialog).getByRole("img", { name: first.alt }),
    ).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: "Tutup pratinjau foto" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates to the next photo inside the lightbox", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GallerySection />);

    await user.click(
      screen.getByRole("button", {
        name: `Buka pratinjau foto: ${galleryPhotos[0].title}`,
      }),
    );

    const dialog = await screen.findByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: "Foto berikutnya" }),
    );

    expect(
      within(dialog).getByRole("img", { name: galleryPhotos[1].alt }),
    ).toBeInTheDocument();
  });

  it("closes the lightbox when Escape is pressed", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GallerySection />);

    await user.click(
      screen.getByRole("button", {
        name: `Buka pratinjau foto: ${galleryPhotos[0].title}`,
      }),
    );
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
