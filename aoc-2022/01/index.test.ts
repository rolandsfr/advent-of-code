import { getElfWithMostCookies, getTopThreeElfsWithMostCookies } from ".";

const data = [
  1000,
  2000,
  3000,
  NaN,
  4000,
  NaN,
  5000,
  6000,
  NaN,
  7000,
  8000,
  9000,
  NaN,
  10000,
];

describe("get the elf with most calories", () => {
  it("gets the elf with most calories", () => {
    expect(getElfWithMostCookies(data)).toBe(24000);
  });
});

describe("gets top 3 elfs with most calories", () => {
  it("returns sum of calories of top 3 elfs", () => {
    expect(getTopThreeElfsWithMostCookies(data)).toEqual(45000);
  });
});
