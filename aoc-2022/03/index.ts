import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname);

const getItemScore = (item: string): number => {
  let sum = 0;
  if (item) {
    if (item.toLocaleLowerCase() == item) sum += item.charCodeAt(0) - 96;
    else sum += item.charCodeAt(0) - 65 + 27;
  }

  return sum;
};

// PART 1
export const getTotalCommonItemPrioritySum = (input: string[]): number => {
  let sum = 0;
  input.forEach((rucksack) => {
    let commonItem: string | null = null;

    const [comp1, comp2]: [string, string] = [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ];

    for (let i of comp1) {
      for (let j of comp2) {
        if (i == j) commonItem = i;
      }
    }

    sum += getItemScore(commonItem!);
  });

  return sum;
};

// PART 2
export const getSumOfElfTrioBadgeItemPriorities = (input: string[]): number => {
  let trios: string[][] = [];
  let totalSum = 0;

  input.forEach((rucksack, index) => {
    if (index % 3 == 0) trios.push(input.slice(index, index + 3));
  });

  trios.forEach((trio, index) => {
    let badge = "";
    let possibleMatches: string[] = [];
    let linesByLengths: typeof trio = trio.sort((a, b) => b.length - a.length);

    // get the matches in first two
    for (let symOuter of linesByLengths[0]) {
      for (let symInner of linesByLengths[1]) {
        if (symInner == symOuter && !possibleMatches.includes(symOuter))
          possibleMatches.push(symOuter);
      }
    }

    // see which one of the matches is also in 3rd (final match)
    for (let sym of linesByLengths[2]) {
      for (let possibleMatch of possibleMatches) {
        if (sym == possibleMatch) badge = sym;
      }
    }

    totalSum += getItemScore(badge);
  });

  return totalSum;
};

console.log(getSumOfElfTrioBadgeItemPriorities(input));
