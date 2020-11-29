// From user_model:
// name: { type: String, trim: true, required: true, maxlength: 32 }

const isStringValid = (string) => {
  if (!string || typeof string !== "string" || string.length > 32) {
    return false;
  }
  return true;
};

// From user_model:
//  email: { type: String, trim: true, required: true, unique: true, maxlength: 32}

const isEmailValid = (email) => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!pattern.test(String(email).toLowerCase()) || email.length > 32) {
    return false;
  }
  return true;
};

const createClientEmailHTML = (recipientName, order) => {
  return `<h1>Hey ${recipientName}, thank you for trying out my eCommerce Project!</h1>
  <h3> Here's the product order information: </h3>
  <hr />
  <h2>Total products ordered: ${order.products.length}</h2>
  <h2>Transaction id: ${order.transaction_id}</h2>
  <h2>Order status: ${order.status}</h2>
  <br >
  <h2>Product details:</h2>
  <hr />
  ${order.products
    .map(({ name, price, quantity }) => {
      return `<div>
      <h3>Product name: ${name}</h3>
      <h3>Priced at: ${price}</h3>
      <h3>Quantity: ${quantity}</h3>
      </div>`;
    })
    .join("--------------------")}
  <h2>Total cost: ${order.amount}<h2>
  <p>Thanks again!</p>`;
};

const createAdminEmailHTML = (order) => {
  return `
  <h1>Hey Jeff! Someone made a test purchase</h1>
  <h2>Customer name: ${order.user.name}</h2>
  <h2>Customer address: ${order.address}</h2>
  <h2>User's email: ${order.user.email}</h2>
  <h2>Total products: ${order.products.length}</h2>
  <h2>Transaction id: ${order.transaction_id}</h2>
  <h2>Order status: ${order.status}</h2>
  <h2>Product details:</h2>
  <hr />
  ${order.products
    .map(({ name, price, quantity }) => {
      return `<div>
              <h3>Product name: ${name}</h3>
              <h3>Priced at: ${price}</h3>
              <h3>Quantity: ${quantity}</h3>
      </div>`;
    })
    .join("--------------------")}
  <h2>Total order cost: ${order.amount}<h2>
`;
};

module.exports = { isStringValid, isEmailValid };
