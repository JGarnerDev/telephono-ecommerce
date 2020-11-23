const createOrder = (Order) => (orderData) => {
  const order = new Order(orderData);
  return order.save();
};

module.exports = (Order) => {
  return {
    createOrder: createOrder(Order),
  };
};
