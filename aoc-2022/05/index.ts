import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname);

interface ParsedCommand {
  amount: number;
  startStack: number;
  endStack: number;
}

export const getResultingCratesOnTop = (
  input: string[],
  byOne: boolean
): string => {
  let finalCrateItems = "";
  const breakIndex = input.indexOf("");

  // seperate graph and commands
  const [cratesGraph, commands] = [
    input.slice(0, breakIndex - 1),
    input.slice(breakIndex + 1),
  ];

  let crates: string[][] = [];
  let pureStrings: string[] = [];

  // parse graph into actiol string[] representation
  cratesGraph.forEach((crateRow) => {
    let parsedRow = "";
    let encounterdSpaceSymbols = 0;
    for (let i = 0; i < crateRow.length; i++) {
      const sym = crateRow[i];
      if (/^[A-Z]$/.test(sym)) {
        parsedRow += sym;
        continue;
      }

      if (sym == " " && /^\S$/.test(crateRow[i - 1])) {
        parsedRow += "-";
        if (crateRow[i + 4] && i != crateRow.length - 4) {
          continue;
        }
      }

      if (/^\s$/.test(sym)) {
        encounterdSpaceSymbols++;
        if (encounterdSpaceSymbols == 4) {
          encounterdSpaceSymbols = 0;
          parsedRow += "x-";
        }
      }
    }

    pureStrings.push(parsedRow);
  });

  let column = pureStrings.length - 1;
  let cratesColumn: string[] = [];

  // transform into array of crate columns
  for (let j = 0; j < pureStrings[0].length; ) {
    if (column >= 0) {
      let sym = pureStrings[column][j];

      if (/^[A-Z]$/.test(sym)) {
        cratesColumn.push(sym);
      }

      column--;
    } else {
      if (cratesColumn.length) {
        crates.push(cratesColumn);
      }

      j++;
      column = pureStrings.length - 1;
      cratesColumn = [];
    }
  }

  // reshape commands into convenient interface
  const parsedCommands: ParsedCommand[] = commands.map((command) => {
    let parsedCommand: ParsedCommand;

    const numbers = command.match(/\d+/g)?.map((com) => parseInt(com))!;
    parsedCommand = {
      amount: numbers[0],
      startStack: numbers[1] - 1,
      endStack: numbers[2] - 1,
    };

    return parsedCommand;
  });

  // rearange crates by commands
  parsedCommands.forEach((command) => {
    const { amount, startStack, endStack } = command;
    const removalStartIndex = crates[startStack].length - amount;

    const itemsToMove = crates[startStack].slice(removalStartIndex);

    if (crates[startStack].length) {
      crates[startStack].splice(removalStartIndex);
    }

    // add .reverse () at the end for part 1
    crates[endStack].push(...(byOne ? itemsToMove.reverse() : itemsToMove));
  });

  crates.forEach((crate) => {
    finalCrateItems += crate[crate.length - 1];
  });

  return finalCrateItems;
};

console.log(getResultingCratesOnTop(input, false));
