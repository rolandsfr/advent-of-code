import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname);

// PART 1
const getFinalLocation = (input: string[]): number => {
  const checkNext = (
    index: number = -1,
    horizontal: number = 0,
    vertical: number = 0
  ): number => {
    if (index === input.length - 1) return horizontal * vertical;
    const [direction, amount] = input[index + 1].split(" ");

    switch (direction) {
      case "forward":
        return checkNext(index + 1, horizontal + parseInt(amount), vertical);
      case "up":
        return checkNext(index + 1, horizontal, vertical - parseInt(amount));
      case "down":
        return checkNext(index + 1, horizontal, vertical + parseInt(amount));
    }
    return checkNext(index + 1, horizontal, vertical);
  };

  return checkNext();
};

// PART 2
const getFinalAimedLocation = (input: string[]): number => {
  const checkNext = (
    index: number = 0,
    horizontal: number = 0,
    vertical: number = 0,
    aim: number = 0
  ): number => {
    if (!input[index]) {
      return horizontal * vertical;
    }
    const [direction, amount] = input[index].split(" ");
    const parsedAmount = parseInt(amount);

    switch (direction) {
      case "forward":
        return checkNext(
          index + 1,
          horizontal + parsedAmount,
          vertical + aim * parsedAmount,
          aim
        );
      case "up":
        return checkNext(index + 1, horizontal, vertical, aim - parsedAmount);
      case "down":
        return checkNext(index + 1, horizontal, vertical, aim + parsedAmount);
    }
    return checkNext(index + 1, horizontal, vertical, aim);
  };

  return checkNext();
};

export { getFinalLocation, getFinalAimedLocation };
