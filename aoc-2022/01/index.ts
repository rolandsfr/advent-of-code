import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname).map((level) => parseInt(level));

type InputData = number[];

const getCaloriesSum = (input: InputData): number[] => {
  const data: InputData = [];
  let tempSum = 0;
  input = [...input, NaN];

  for (let i = 0; i < input.length; i++) {
    let line = input[i];
    if (line !== line) {
      data.push(tempSum);
      tempSum = 0;
      continue;
    }
    tempSum += line;
  }

  return data;
};

// PART 1
export const getElfWithMostCookies = (input: InputData): number => {
  return Math.max(...getCaloriesSum(input));
};

// PART 2
export const getTopThreeElfsWithMostCookies = (input: InputData): number => {
  let sums = getCaloriesSum(input);

  return sums
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((prev, curr) => prev + curr);
};
