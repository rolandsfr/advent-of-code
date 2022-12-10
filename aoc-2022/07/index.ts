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
}

const getIndexOfDir = (
  name: string,
  level: number,
  arr: AccumulatedDirs[]
): number => {
  return arr.findIndex((obj) => obj.dir == name && obj.level == level);
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

export const getSumOfSmallSizeDirectories = (input: string[]): number => {
  const reshaped: (Command | FileType)[] = input.map((line) => {
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

  let accumulatedSize: AccumulatedDirs[] = [];
  let previousParents: string[] = [];

  for (let i = 0; i < reshaped.length; i++) {
    const el = reshaped[i];

    if (el.type == "command") {
      if (el.operation !== ".." && el.command !== "ls") {
        previousParents.push(el.value || "/");

        accumulatedSize.push({
          accumulated: 0,
          dir: el.value || "/",
          level: previousParents.length - 1,
        });
      } else if (el.operation == ".." && previousParents.length > 1) {
        previousParents.pop();
      }

      continue;
    }

    for (let j = i; ; j++) {
      if (!reshaped[j]) {
        i = reshaped.length;
        break;
      }
      if (reshaped[j].type == "command") {
        i = j - 1;
        break;
      }

      const doc = reshaped[j];

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
    console.log(accumulatedSize);
  }

  const totalSize = accumulatedSize
    .filter((dir) => dir.accumulated <= 100000)
    .map((dir) => dir.accumulated)
    .reduce((prev, curr) => prev + curr);

  return totalSize;
};

const res = getSumOfSmallSizeDirectories(input);
console.log(res);
