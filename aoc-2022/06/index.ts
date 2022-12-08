import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname)[0];

const hasRepeatedSymbols = (arr: string[]): boolean => {
  return arr.length !== new Set(arr).size;
};

export const getStartOfMarker = (
  input: string,
  consequentDigits: number
): number | null => {
  let tempBuffer: string[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i; j <= i + consequentDigits - 1; j++) {
      tempBuffer.push(input[j]);
      if (tempBuffer.length == consequentDigits) {
        if (!hasRepeatedSymbols(tempBuffer)) {
          return j + 1;
        }
      }
    }
    tempBuffer = [];
  }

  return null;
};
