const createUser = (User) => (userData) => {
  const user = new User(userData);
  return user.save();
};

const findUser = (User) => (email) => {
  return User.findOne({ email });
};
const findUserByID = (User) => (_id) => {
  return User.findOne({ _id });
};

const listUsers = (User) => () => {
  return User.find({});
};

module.exports = (User) => {
  return {
    createUser: createUser(User),
    findUser: findUser(User),
    listUsers: listUsers(User),
    findUserByID: findUserByID(User),
  };
};
