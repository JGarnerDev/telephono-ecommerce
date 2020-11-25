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

const updateUser = (User) => async (_id, newUserData) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { $set: newUserData },
    { new: true }
  );
  await updatedUser.save();
  return updatedUser;
};

const listUsers = (User) => () => {
  return User.find({});
};

const addOrderToUserHistory = (User) => (_id, orderData) => {
  const history = [];
  orderData.products.forEach((product) => {
    history.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      transaction_id: orderData._id,
    });
  });

  return User.findOneAndUpdate(
    { _id },
    { $push: { history: history } },
    { new: true }
  );
};

const getUserOrderHistory = (User) => (_id) => {
  return User.findOne({ _id }).select(["history"]);
};

module.exports = (User) => {
  return {
    createUser: createUser(User),
    findUser: findUser(User),
    listUsers: listUsers(User),
    findUserByID: findUserByID(User),
    updateUser: updateUser(User),
    addOrderToUserHistory: addOrderToUserHistory(User),
    getUserOrderHistory: getUserOrderHistory(User),
  };
};
