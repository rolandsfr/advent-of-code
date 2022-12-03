import fs from "fs";
import path from "path";

export const loadInput = (dir: string): string[] => {
  const rawInput = fs.readFileSync(path.resolve(dir, "./input.txt"), "utf8");

  return rawInput.split("\r\n");
};
