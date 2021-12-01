import { getTotalIncreases, getTotalSumIncreases } from ".";

describe("level comparison behavior", () => {
  const data = [3, 5, 2, 6, 7, 8, 2, 3, 2, 1];

  it("compares two individual levels as single numbers and returns amount of increases", () => {
    expect(getTotalIncreases(data)).toEqual(5);
  });

  it("compares two levels by three-measurement sliding windows and returns amount of increases", () => {
    expect(getTotalSumIncreases(data)).toEqual(3);
  });
});
