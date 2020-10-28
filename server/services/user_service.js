const createUser = (User) => (name) => {
  if (!name) {
    throw new Error(`Name: ${name}`);
  }
  const user = new User({ name });
  return user.save();
};

const listUsers = (User) => () => {
  return User.find({});
};

module.exports = (User) => {
  return {
    createUser: createUser(User),
    listUsers: listUsers(User),
  };
};
