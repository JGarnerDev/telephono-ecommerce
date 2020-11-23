const createOrder = (Order) => (orderData) => {
  const order = new Order(orderData);
  return order.save();
};
const listOrders = (Order) => () => {
  return Order.find({}).sort("_id");
};

const getShipmentStatusValues = (Order) => () => {
  return Order.schema.path("status").enumValues;
};
const updateShipmentStatus = (Order) => (_id, newStatus) => {
  return Order.findOneAndUpdate({ _id }, { status: newStatus });
};

module.exports = (Order) => {
  return {
    createOrder: createOrder(Order),
    listOrders: listOrders(Order),
    getShipmentStatusValues: getShipmentStatusValues(Order),
    updateShipmentStatus: updateShipmentStatus(Order),
  };
};
