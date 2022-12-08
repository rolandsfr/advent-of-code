import { getStartOfMarker } from ".";

const data = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

describe("returns index of start of packet marker in a given signal", () => {
  it("does that from the first occurance next 4 different digits", () => {
    expect(getStartOfMarker(data, 4)).toBe(7);
  });

  it("does that from the first occurance next 14 different digits", () => {
    expect(getStartOfMarker(data, 14)).toBe(19);
  });
});
