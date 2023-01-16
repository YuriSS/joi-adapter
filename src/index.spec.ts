import { sum } from "./index";

describe("Sum", () => {
  it("should sum", () => {
    expect(sum(3, 3)).toBe(6);
  });
});
