import { loadInput } from "../../utils/loadInput";

const input: string[] = loadInput(__dirname);

export const getRangeBounds = (
  range: string
): { start: number; end: number } => {
  const bounds = range.split("-").map((bound) => parseInt(bound));
  return {
    start: bounds[0],
    end: bounds[1],
  };
};

export const getFullyContainedRangePairs = (input: string[]): number => {
  let pairs: string[][] = input.map((pair) => pair.split(","));
  let total = 0;

  pairs.forEach((pair) => {
    const reshapedPair = [getRangeBounds(pair[0]), getRangeBounds(pair[1])];

    // sort by the range containment
    reshapedPair.sort((a, b) => {
      if (a.start >= b.start && a.end <= b.end) return -1;
      else if (a.start <= b.start && a.end >= b.end) return +1;
      else return 0;
    });

    const [elf1, elf2] = reshapedPair;

    // if one fully contains the other (has inclusive bounds of the other)
    if (elf1.start >= elf2.start && elf1.end <= elf2.end) total++;
  });

  return total;
};

export const getContainedRangePairs = (input: string[]): number => {
  let pairs: string[][] = input.map((pair) => pair.split(","));
  let total = 0;
  pairs.forEach((pair) => {
    // reshape into object-like array
    const reshapedPair = [getRangeBounds(pair[0]), getRangeBounds(pair[1])];

    // first pair in each has the lowest lower bound
    const pairsByLowestLowerBound = [...reshapedPair].sort((a, b) => {
      return a.start - b.start;
    });

    // first pair in each jas the highest upper bound
    const pairsByHighestUpperBound = [...reshapedPair].sort((a, b) => {
      return b.end - a.end;
    });

    // for range from lowerst bound to highest bound
    for (
      let i = pairsByLowestLowerBound[0].start;
      i <= pairsByHighestUpperBound[0].end;
      i++
    ) {
      // if is in range
      if (
        i >= pairsByLowestLowerBound[0].start &&
        i <= pairsByHighestUpperBound[1].end &&
        i >= pairsByLowestLowerBound[1].start &&
        i <= pairsByHighestUpperBound[0].end
      ) {
        total++;
        break;
      }
    }
  });

  return total;
};
