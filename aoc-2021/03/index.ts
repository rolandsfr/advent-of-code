import { loadInput } from "../utils/loadInput";

type Input = string[];
const input: Input = loadInput(__dirname);

// PART 1
const getMostCommonBitInColumn = (
  colIndex: number,
  input: Input,
  keepOnEqual: number | null = null,
  reverse: boolean = false,
  verticalUnitIndex = 0,
  savedTruthyBits: number[] = [],
  mostCommonBit: number = 0
): number => {
  if (verticalUnitIndex == input.length) {
    const truthy = savedTruthyBits.length;
    const untruthy = input.length - truthy;

    if (keepOnEqual && truthy === untruthy) return keepOnEqual;
    if (reverse) return +(truthy < untruthy);
    return +(truthy > untruthy);
  }

  const currentBit = input[verticalUnitIndex][colIndex];
  const appendedTruthyBits =
    currentBit === "1" ? [...savedTruthyBits, 1] : savedTruthyBits;

  return getMostCommonBitInColumn(
    colIndex,
    input,
    keepOnEqual,
    reverse,
    verticalUnitIndex + 1,
    appendedTruthyBits,
    mostCommonBit
  );
};

const getMostCommonBits = (input: Input): number[] => {
  const loopEveryColumn = (
    colIndex = 0,
    commonBits: number[] = []
  ): number[] => {
    if (colIndex == input[0].length) return commonBits;

    return loopEveryColumn(colIndex + 1, [
      ...commonBits,
      getMostCommonBitInColumn(colIndex, input),
    ]);
  };
  return loopEveryColumn();
};

const getPowerConsumption = (input: Input) => {
  const mostCommonBits = getMostCommonBits(input);
  const gammaRate = mostCommonBits.join("");
  const epsilonRate = mostCommonBits.map((bit) => Math.abs(bit - 1)).join("");

  return parseInt(epsilonRate, 2) * parseInt(gammaRate, 2);
};

// PART 2
type LifeSupportRatings = [number, number];

const getLifeSupportRatings = (input: Input): LifeSupportRatings => {
  const getRating = (
    binariesLeft: string[],
    keepOnEqual: number,
    currentPosition: number = 0
  ): number => {
    if (binariesLeft.length == 1) return parseInt(binariesLeft[0], 2);
    const reverseBehavior = !Boolean(keepOnEqual);
    const mostCommonBit = getMostCommonBitInColumn(
      currentPosition,
      binariesLeft,
      keepOnEqual,
      reverseBehavior
    );
    const binaries = binariesLeft.filter(
      (binary) => parseInt(binary[currentPosition]) == mostCommonBit
    );

    return getRating(binaries, keepOnEqual, currentPosition + 1);
  };

  const oxygenRating = getRating(input, 1);
  const co2ScrubbingRating = getRating(input, 0);

  return [oxygenRating, co2ScrubbingRating];
};

const calculateLifeSupportRating = (ratings: LifeSupportRatings) => {
  return ratings[0] * ratings[1];
};

export {
  getPowerConsumption,
  getMostCommonBits,
  getLifeSupportRatings,
  calculateLifeSupportRating,
};
