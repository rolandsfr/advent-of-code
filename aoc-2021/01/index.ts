import fs from "fs";
import path from "path";

const rawInput = fs.readFileSync(
  path.resolve(__dirname, "./input.txt"),
  "utf8"
);

// creating an array from the raw input data
const input = rawInput.split("\r\n").map((level) => parseInt(level));

// PART 1 - comparing 2 individual levels (as number)
const getTotalIncreases = (input: number[]): number => {
  // recursively checking if the next number is greater than the previous one
  const checkNext = (index: number = 0, found: number = 0): number => {
    if (index === input.length - 1) return found;
    if (input[index] < input[index + 1]) ++found;
    return checkNext(index + 1, found);
  };
  return checkNext();
};

// PART 2 - comparing levels by sums of 3 levels per window
const getTotalSumIncreases = (input: number[]): number => {
  // recursively checking if the next number is greater than the previous one
  const checkNext = (windowIndex: number = 3, found = 0): number => {
    if (windowIndex + 1 > input.length) return found;
    const screenA = input
      .slice(windowIndex - 3, windowIndex)
      .reduce((prev, next) => prev + next);
    const screenB = input
      .slice(windowIndex - 2, windowIndex + 1)
      .reduce((prev, next) => prev + next);

    if (screenA < screenB) ++found;
    return checkNext(windowIndex + 1, found);
  };
  return checkNext();
};

export { getTotalIncreases, getTotalSumIncreases };
