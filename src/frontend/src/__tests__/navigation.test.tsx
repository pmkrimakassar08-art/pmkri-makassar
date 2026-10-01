import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";
import { NAV_ITEMS } from "@/lib/site";
import { renderWithProviders } from "./render-app";

// The contact section resolves its actor through this hook. A local typed mock
// keeps the whole page renderable without Internet Identity or a network.
const submitContactMessage = vi.fn();
vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: { submitContactMessage }, isFetching: false }),
}));

// jsdom does not implement scrollIntoView; the navbar and hero call it to move
// between sections. Spy on it so we can assert which section each menu targets.
const scrollIntoView = vi.fn();
const originalScrollIntoView = Element.prototype.scrollIntoView;

beforeEach(() => {
  submitContactMessage.mockReset();
  scrollIntoView.mockReset();
  Element.prototype.scrollIntoView = scrollIntoView;
});

afterEach(() => {
  Element.prototype.scrollIntoView = originalScrollIntoView;
});

describe("Navbar section navigation", () => {
  it("points each of the four menus at its own section", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });

    for (const item of NAV_ITEMS) {
      scrollIntoView.mockClear();
      await user.click(within(nav).getByRole("button", { name: item.label }));

      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      const target = scrollIntoView.mock.instances[0] as unknown as HTMLElement;
      expect(target.id).toBe(item.id);
    }
  });

  it("renders a section element for every navigation target", () => {
    renderWithProviders(<App />);

    for (const item of NAV_ITEMS) {
      expect(document.getElementById(item.id)).not.toBeNull();
    }
  });

  it("applies the maroon base background to the page shell", () => {
    const { container } = renderWithProviders(<App />);

    const shell = container.firstElementChild;
    expect(shell).not.toBeNull();
    expect(shell).toHaveClass("bg-background");
  });
});
