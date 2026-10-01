import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  await expect(actor.listContactMessages()).resolves.toEqual([]);
});

it("round-trips a contact message through the real canister", async () => {
  const created = await actor.submitContactMessage({
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Saya ingin bergabung dengan kegiatan PMKRI Makassar.",
  });

  expect(created.name).toBe("Ada Lovelace");
  expect(created.email).toBe("ada@example.com");
  expect(created.message).toBe(
    "Saya ingin bergabung dengan kegiatan PMKRI Makassar.",
  );

  const listed = await actor.listContactMessages();
  expect(listed).toHaveLength(1);
  expect(listed[0]).toMatchObject({
    id: created.id,
    name: "Ada Lovelace",
    email: "ada@example.com",
  });
});

it("trims surrounding whitespace from a submitted message", async () => {
  const created = await actor.submitContactMessage({
    name: "  Maria Angelica  ",
    email: "  maria@example.com  ",
    message: "  Pesan dengan spasi di sekelilingnya.  ",
  });

  expect(created.name).toBe("Maria Angelica");
  expect(created.email).toBe("maria@example.com");
  expect(created.message).toBe("Pesan dengan spasi di sekelilingnya.");
});

it("does not persist a message whose name is too short", async () => {
  const before = await actor.listContactMessages();
  const created = await actor.submitContactMessage({
    name: "A",
    email: "short@example.com",
    message: "Pesan ini seharusnya tidak tersimpan.",
  });

  expect(created.id).toBe(0n);
  expect(created.name).toBe("");
  const after = await actor.listContactMessages();
  expect(after).toHaveLength(before.length);
});

it("keeps the canister id stable for the installed fixture", () => {
  expect(canisterId).toBeDefined();
});
