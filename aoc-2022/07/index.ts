import { loadInput } from "../../utils/loadInput";

const input = loadInput(__dirname);

interface Command {
  type: "command";
  command: "cd" | "ls";
  operation: "/" | ".." | undefined;
  value?: string;
}

interface FileType {
  type: "file" | "dir";
  name: string;
  size?: number;
}

interface AccumulatedDirs {
  dir: string;
  accumulated: number;
  level: number;
  accumulationStopped: boolean;
}

const getIndexOfDir = (
  name: string,
  level: number,
  arr: AccumulatedDirs[]
): number => {
  return arr.findIndex(
    (obj) => obj.dir == name && obj.level == level && !obj.accumulationStopped
  );
};

const addToParents = (
  parents: string[],
  accumulatedArr: AccumulatedDirs[],
  size: number
) => {
  parents.slice(0, parents.length - 1).forEach((dir, lvl) => {
    const index = getIndexOfDir(dir, lvl, accumulatedArr);
    accumulatedArr[index] = {
      ...accumulatedArr[index],
      accumulated: accumulatedArr[index].accumulated + size,
    };
  });
};

const getParsedInput = (input: string[]): (Command | FileType)[] => {
  return input.map((line) => {
    // sort by type
    const values = line.split(" ");
    if (line[0] == "$") {
      return {
        type: "command",
        command: values[1],
        operation: values[2] !== "/" && values[2] !== ".." ? null : values[2],
        value:
          values[1] == "cd" && values[2] !== "/" && values[2] !== ".."
            ? values[2]
            : null,
      } as Command;
    } else {
      return {
        type: values[0] == "dir" ? "dir" : "file",
        name: values[1],
        size: values[0] == "dir" ? null : parseInt(values[0]),
      } as FileType;
    }
  });
};

const getFlattenedFS = (input: string[]): AccumulatedDirs[] => {
  const parsedInput = getParsedInput(input);
  let accumulatedSize: AccumulatedDirs[] = [];
  let previousParents: string[] = [];

  for (let i = 0; i < parsedInput.length; i++) {
    const el = parsedInput[i];

    if (el.type == "command") {
      if (el.operation !== ".." && el.command !== "ls") {
        previousParents.push(el.value || "/");

        accumulatedSize.push({
          accumulated: 0,
          dir: el.value || "/",
          level: previousParents.length - 1,
          accumulationStopped: false,
        });
      } else if (el.operation == ".." && previousParents.length > 1) {
        const index = getIndexOfDir(
          previousParents[previousParents.length - 1],
          previousParents.length - 1,
          accumulatedSize
        );
        accumulatedSize[index] = {
          ...accumulatedSize[index],
          accumulationStopped: true,
        };
        previousParents.pop();
      }

      continue;
    }

    for (let j = i; ; j++) {
      const doc = parsedInput[j];
      if (!doc) {
        i = parsedInput.length;
        break;
      }
      if (doc.type == "command") {
        i = j - 1;
        break;
      }

      if (doc.type == "file") {
        const targetDirIndex = getIndexOfDir(
          previousParents[previousParents.length - 1],
          previousParents.length - 1,
          accumulatedSize
        );

        accumulatedSize[targetDirIndex] = {
          ...accumulatedSize[targetDirIndex],
          accumulated:
            accumulatedSize[targetDirIndex].accumulated + (doc.size as number),
        };

        addToParents(previousParents, accumulatedSize, doc.size as number);
      }
    }
  }

  return accumulatedSize;
};

export const getSumOfDirectoriesSmallerThan100k = (input: string[]): number => {
  const fs = getFlattenedFS(input);

  return fs
    .filter((dir) => dir.accumulated <= 100000)
    .map((dir) => dir.accumulated)
    .reduce((prev, curr) => prev + curr);
};

export const getSizeOfDirectoryToDelete = (input: string[]): number => {
  const TOTAL_DISK_CAPACITY = 70000000;
  const SPACE_NEEDED_FOR_UPDATE = 30000000;

  const fs = getFlattenedFS(input);
  const root = fs[0];
  const freeSpace = TOTAL_DISK_CAPACITY - root.accumulated;

  const potentialDirSizesToRemove = fs
    .filter((dir) => freeSpace + dir.accumulated >= SPACE_NEEDED_FOR_UPDATE)
    .map((dir) => dir.accumulated);

  return Math.min(...potentialDirSizesToRemove);
};

const res = getSumOfDirectoriesSmallerThan100k(input);
console.log(res);
console.log(getSizeOfDirectoryToDelete(input));
