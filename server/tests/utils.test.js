const crypto = require("crypto");

const { isStringValid, isEmailValid } = require("../utils");

describe("Utility functions", () => {
  describe("isStringValid function", () => {
    it("has a module", () => {
      expect(isStringValid).toBeDefined();
    });

    it("returns false if no argument is passed", () => {
      const actual = isStringValid();
      expect(actual).toEqual(false);
    });
    it("returns false if the argument is not a passable string", () => {
      const badNames = [
        undefined,
        null,
        false,
        true,
        1,
        [],
        {},
        "",
        "ThisName=AboveThirtyTwoCharacters",
      ];

      badNames.forEach((badName) => {
        const actual = isStringValid(badName);
        expect(actual).toBeFalsy();
      });
    });
    it("returns true if the argument is a string", () => {
      let iterations = 0;
      while (iterations < 10) {
        const randomSize = ~~(Math.random() * 10) + 1;
        const randomAcceptableName = crypto
          .randomBytes(randomSize)
          .toString("hex");
        const actual = isStringValid(randomAcceptableName);
        expect(actual).toBeTruthy();
        iterations++;
      }
    });
  });
  describe("isEmailValid function", () => {
    it("has a module", () => {
      expect(isEmailValid).toBeDefined();
    });
    it("returns false when no argument is passed", () => {
      const actual = isEmailValid();
      expect(actual).toBe(false);
    });
    it("returns false when a bad email argument is passed", () => {
      const badEmails = [
        undefined,
        null,
        false,
        true,
        1,
        "",
        [],
        {},
        "@gmail.com",
        "Foo@.com",
        "Foo@gmail",
        "Foo",
        "thisEmailIsTooLongBy1@hotmail.com",
      ];
      badEmails.forEach((badEmail) => {
        const actual = isEmailValid(badEmail);
        expect(actual).toBeFalsy();
      });
    });
    it("returns true when an acceptable email is passed", () => {
      const goodEmails = ["a@gmail.com", "a@a.com"];
      goodEmails.forEach((goodEmail) => {
        const actual = isEmailValid(goodEmail);
        expect(actual).toBeTruthy();
      });
    });
  });
});
