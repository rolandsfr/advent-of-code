import { getContainedRangePairs, getFullyContainedRangePairs } from ".";

const data = ["2-4,6-8", "2-3,4-5", "5-7,7-9", "2-8,3-7", "6-6,4-6", "2-6,4-8"];

describe("get contained range from given pair", () => {
  it("gets total fully contained ranges in a given pair", () => {
    expect(getFullyContainedRangePairs(data)).toBe(2);
  });
  it("gets total contained ranges in a given pair at all", () => {
    expect(getContainedRangePairs(data)).toBe(4);
  });
});
