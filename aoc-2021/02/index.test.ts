import { getFinalLocation, getFinalAimedLocation } from "./";

describe("submarine final location", () => {
  const input = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];

  it("locates submarine from the given direction", () => {
    expect(getFinalLocation(input)).toEqual(150);
  });

  it("locates submarine with aim", () => {
    expect(getFinalAimedLocation(input)).toEqual(900);
  });
});
