const crypto = require("crypto");

const { isNameValid } = require("../utils");

describe("Utility functions", () => {
  describe("isNameValid function", () => {
    it("has a module", () => {
      expect(isNameValid).toBeDefined();
    });

    it("returns false if no argument is passed", () => {
      const actual = isNameValid();
      expect(actual).toEqual(false);
    });
    it("returns false if the argument is not a string", () => {
      const badNames = [undefined, null, false, true, 1, [], {}, ""];

      badNames.forEach((badName) => {
        const actual = isNameValid(badName);
        expect(actual).toBeFalsy();
      });
    });
    it("returns true if the argument is a string", () => {
      let iterations = 0;
      while (iterations < 10) {
        const randomSize = ~~(Math.random() * 20) + 1;
        const randomAcceptableName = crypto
          .randomBytes(randomSize)
          .toString("hex");
        const actual = isNameValid(randomAcceptableName);
        expect(actual).toBeTruthy();
        iterations++;
      }
    });
  });
});
