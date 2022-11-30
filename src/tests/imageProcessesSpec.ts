import imageProcesses from "../utilities/imageProcesses";

describe("Test image avilability", () => {
  it("should throw Error if the filename is not avilable", async () => {
    const response = await imageProcesses("lion", 500, 500);
    expect(response).toThrow;
  });

  it("should not throw Error if the filename is avilable", async () => {
    const response = await imageProcesses("fjord", 500, 500);
    expect(response).not.toThrow;
  });
});
