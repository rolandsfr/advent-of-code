import {
  getSumOfDirectoriesSmallerThan100k,
  getSizeOfDirectoryToDelete,
} from ".";
import { loadInput } from "../../utils/loadInput";

const data = loadInput(__dirname, true);

describe("parses cli logs and does required operations", () => {
  it("returns sum of sizes of directories that are in terms of size are less than 10k", () => {
    expect(getSumOfDirectoriesSmallerThan100k(data)).toBe(95437);
  });

  it("returns size of directory to delete to have enough space for the update", () => {
    expect(getSizeOfDirectoryToDelete(data)).toBe(24933642);
  });
});
