import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactSection } from "@/components/ContactSection";
import { renderWithProviders } from "./render-app";

const submitContactMessage = vi.fn();
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitContactMessage }, isFetching: false }),
}));

beforeEach(() => {
  submitContactMessage.mockReset();
});

async function fillForm(
  user: ReturnType<typeof userEvent.setup>,
  values: { name?: string; email?: string; message?: string },
) {
  if (values.name !== undefined) {
    await user.type(screen.getByLabelText("Nama Lengkap"), values.name);
  }
  if (values.email !== undefined) {
    await user.type(screen.getByLabelText("Email"), values.email);
  }
  if (values.message !== undefined) {
    await user.type(screen.getByLabelText("Pesan"), values.message);
  }
}

describe("ContactSection form", () => {
  it("rejects an empty submission and shows field errors", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactSection />);

    await user.click(screen.getByRole("button", { name: /Kirim Pesan/ }));

    expect(screen.getByText("Nama minimal 2 karakter.")).toBeInTheDocument();
    expect(
      screen.getByText("Masukkan alamat email yang valid."),
    ).toBeInTheDocument();
    expect(screen.getByText("Pesan minimal 10 karakter.")).toBeInTheDocument();
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it("rejects an invalid email address", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactSection />);

    await fillForm(user, {
      name: "Budi Santoso",
      email: "bukan-email",
      message: "Pesan yang cukup panjang untuk lolos validasi.",
    });
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/ }));

    expect(
      screen.getByText("Masukkan alamat email yang valid."),
    ).toBeInTheDocument();
    expect(submitContactMessage).not.toHaveBeenCalled();
  });

  it("submits a valid message and shows the success feedback", async () => {
    const user = userEvent.setup();
    submitContactMessage.mockResolvedValue({
      id: 1n,
      name: "Budi Santoso",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos validasi.",
      createdAt: 0n,
    });
    renderWithProviders(<ContactSection />);

    await fillForm(user, {
      name: "Budi Santoso",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos validasi.",
    });
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/ }));

    await waitFor(() => {
      expect(submitContactMessage).toHaveBeenCalledWith({
        name: "Budi Santoso",
        email: "budi@example.com",
        message: "Pesan yang cukup panjang untuk lolos validasi.",
      });
    });
    expect(
      await screen.findByText(/Pesan Anda telah terkirim/),
    ).toBeInTheDocument();
  });

  it("shows an error message when the backend rejects the submission", async () => {
    const user = userEvent.setup();
    submitContactMessage.mockRejectedValue(
      new Error("Layanan pesan kontak belum tersedia."),
    );
    renderWithProviders(<ContactSection />);

    await fillForm(user, {
      name: "Budi Santoso",
      email: "budi@example.com",
      message: "Pesan yang cukup panjang untuk lolos validasi.",
    });
    await user.click(screen.getByRole("button", { name: /Kirim Pesan/ }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Layanan pesan kontak belum tersedia.");
    expect(
      screen.queryByText(/Pesan Anda telah terkirim/),
    ).not.toBeInTheDocument();
  });
});
