var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test_db";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require("../services/user/user_model");

// We declare a variable for acceptable user data, which will be re-defined before every test
let acceptableUserData;

describe("User model", () => {
  beforeAll(async () => {
    // Since each test involves the making of a single user, we exercise caution by deleting a user object (if it exists) before every test...
    await User.deleteOne({});
    // ...and confirm the database to have no user objects
    const anyUser = await User.findOne({});
    expect(anyUser).toBeNull();
    //
    User.encrypt = jest.fn().mockResolvedValue();
  });

  beforeEach(() => {
    acceptableUserData = {
      name: "TestName",
      email: "test@test.com",
      password: "TestPassword",
    };
  });

  afterEach(async () => {
    // We delete the user object made during a test
    await User.deleteOne({});
    // ...and to make sure we were not making excessive user objects, we confirm again that there are none
    const anyUser = await User.findOne({});
    expect(anyUser).toBeNull();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(User).toBeDefined();
  });

  describe("Saving a user object", () => {
    it("saves a user object to the database", async () => {
      // We retain some information before making a user
      const name = acceptableUserData.name;
      // Make a new user
      const user = new User(acceptableUserData);
      // Save it to our test database
      const savedUser = await user.save();
      // Delcare a new value based on the saved object
      const actual = savedUser.name;
      // Expect them to be the same
      expect(actual).toEqual(name);
    });
  });

  describe("Getting a user object", () => {
    it("retrieves an existing user object from the database", async () => {
      // We retain some information before making a user
      const name = acceptableUserData.name;
      // Make a new user
      const user = new User(acceptableUserData);
      // Save it to our test database
      await user.save();
      // Attempt to find it by a retained property
      const found = await User.findOne({ name });
      // Delcare a new value based on the retrieved object
      const actual = found.name;
      // Expect them to be the same
      expect(actual).toEqual(name);
    });
  });

  describe("Updating a user object", () => {
    it("updates an existing user object in the database", async () => {
      // We retain some information before making a user
      const name = acceptableUserData.name;
      const updatedName = "I've been updated!";
      // Make a new user
      const user = new User(acceptableUserData);
      // Save it to our test database
      await user.save();
      // Attempt to update the user object
      user.name = updatedName;
      await user.save();
      // Attempt to find user by original name, expecting nothing to be found
      const userWithOldProperties = await User.findOne({ name });
      expect(userWithOldProperties).toBeNull();
      // Attempt to find user by updated name, expecting the user to be found
      const updatedUser = await User.findOne({ name: updatedName });
      const userName = updatedUser.name;
      // Compare values to confirm
      expect(userName).toEqual(updatedName);
    });
  });

  describe("Deleting a user object", () => {
    it("deletes an existing user object in the database", async () => {
      // We retain some information before making a user
      const name = acceptableUserData.name;
      // Make a new user
      const user = new User(acceptableUserData);
      // Save it to our test database
      await user.save();
      // Attempt to delete in by name query
      await User.deleteOne({ name });
      // Attempt to find the deleted user by name
      const foundUser = await User.findOne({ name });
      // Expect this to return null
      expect(foundUser).toBeNull();
      // Expect there to be no users at all in this context (just to be safe)
      const anyUser = await User.findOne({});
      expect(anyUser).toBeNull();
    });
  });
});
