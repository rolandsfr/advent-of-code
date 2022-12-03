import {
  getTotalCommonItemPrioritySum,
  getSumOfElfTrioBadgeItemPriorities,
} from ".";

const data = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

describe("solves the misarrangement of items in rucksakc", () => {
  it("gets the total sum of common item priorities in each rucksack", () => {
    expect(getTotalCommonItemPrioritySum(data)).toBe(157);
  });

  it("gets the total sum of badge item priorities", () => {
    expect(getSumOfElfTrioBadgeItemPriorities(data)).toBe(70);
  });
});
