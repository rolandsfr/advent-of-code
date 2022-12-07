import { getResultingCratesOnTop } from ".";
const data = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
];

describe("returns crates that end up on top", () => {
  it("returns crates that end up on top that are picked up one by one", () => {
    expect(getResultingCratesOnTop(data, true)).toBe("CMZ");
  });
  it("returns crates that end up on top that are picked up entirely", () => {
    expect(getResultingCratesOnTop(data, false)).toBe("MCD");
  });
});
