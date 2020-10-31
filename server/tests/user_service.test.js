const UserService = require("../services/user/user_service");
const sinon = require("sinon");

const acceptableUserData = {
  name: "TestName",
  email: "test@test.com",
  password: "TestPassword",
};

describe("User service", () => {
  it("has a module", () => {
    expect(UserService).toBeDefined();
  });

  describe("listUsers method", () => {
    it("is called when evoked", () => {
      const mockUserModel = {
        find: sinon.spy(),
      };
      const userService = UserService(mockUserModel);
      userService.listUsers();
      const functionWasCalledOnce = mockUserModel.find.calledOnce;
      expect(functionWasCalledOnce).toBeTruthy();
    });
  });

  describe("createUser method", () => {
    it("is called when evoked", () => {
      const save = sinon.spy();

      const MockModel = function (data) {
        name = data.name;
        return {
          ...data,
          save,
        };
      };

      const userService = UserService(MockModel);

      userService.createUser(acceptableUserData);

      const functionWasCalledOnce = save.calledOnce;
      expect(functionWasCalledOnce).toBeTruthy();
    });
  });
});
