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

const updateUser = (User) => (_id, newUserData) => {
  return User.findOneAndUpdate({ _id }, { $set: newUserData }, { new: true });
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

// {
//   status: 'Not processed',
//   _id: 5fbbdf5f2e5a0d2940abb3ac,
//   amount: 8,
//   products: [
//     {
//       _id: 5fb2f668a846792e0cce7f7e,
//       quantity: 1,
//       name: 'asdasda',
//       price: 3,
//       createdAt: 2020-11-16T22:00:08.646Z,
//       updatedAt: 2020-11-16T22:00:08.646Z
//     },
//     {
//       _id: 5fb2f872a846792e0cce7f80,
//       quantity: 1,
//       name: 'fghfgh',
//       price: 5,
//       createdAt: 2020-11-16T22:08:50.777Z,
//       updatedAt: 2020-11-16T22:08:50.777Z
//     }
//   ],
//   address: '234525',
//   user: {
//     role: 1,
//     history: [],
//     _id: 5fada27fa6aab701a0209770,
//     name: 'jjj',
//     password: '$2a$10$DJmUCAGYLZkBACotbQBRwuP0PwFa.WG1HETOsUfXMcMNskbWFGksy',
//     email: 'jdjdjd@f.com',
//     createdAt: 2020-11-12T21:00:47.218Z,
//     updatedAt: 2020-11-12T21:00:47.218Z,
//     __v: 0
//   },
//   createdAt: 2020-11-23T16:12:15.747Z,
//   updatedAt: 2020-11-23T16:12:15.747Z,
//   __v: 0
// }

module.exports = (User) => {
  return {
    createUser: createUser(User),
    findUser: findUser(User),
    listUsers: listUsers(User),
    findUserByID: findUserByID(User),
    updateUser: updateUser(User),
    addOrderToUserHistory: addOrderToUserHistory(User),
  };
};
