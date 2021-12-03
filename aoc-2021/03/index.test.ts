import {
  getPowerConsumption,
  getMostCommonBits,
  getLifeSupportRatings,
  calculateLifeSupportRating,
} from "./";

describe("submarine report", () => {
  const report = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  describe("power consumption rating", () => {
    it("gets the most common bits from the binary report", () => {
      expect(getMostCommonBits(report)).toEqual([1, 0, 1, 1, 0]);
    });

    it("calculates the power consumption from binary report", () => {
      expect(getPowerConsumption(report)).toEqual(198);
    });
  });

  describe("life support rating", () => {
    const ratings = getLifeSupportRatings(report);
    it("calculates oxygen generator rating", () => {
      expect(ratings[0]).toEqual(23);
    });

    it("calculates CO2 scrubber rating", () => {
      expect(ratings[1]).toEqual(10);
    });

    it("calculates the final life support rating", () => {
      expect(calculateLifeSupportRating(ratings));
    });
  });
});
