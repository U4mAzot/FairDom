import { describe, expect, it } from "vitest";
import { isValidPolishNip } from "./nip";

describe("isValidPolishNip", () => {
  it("akceptuje poprawny NIP", () => {
    expect(isValidPolishNip("5260250274")).toBe(true);
  });
  it("odrzuca złą sumę kontrolną", () => {
    expect(isValidPolishNip("5260250275")).toBe(false);
  });
  it("ignoruje znaki niebędące cyframi", () => {
    expect(isValidPolishNip("526-025-02-74")).toBe(true);
  });
});
