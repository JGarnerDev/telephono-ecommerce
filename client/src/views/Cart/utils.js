export const addProduct = (product) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      quantity: 1,
      maxQuantity: product.quantity,
    });

    cart = Array.from(new Set(cart.map((product) => product._id))).map(
      (_id) => {
        return cart.find((product) => product._id === _id);
      }
    );

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeProduct = (_id) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart = cart.filter((product) => product._id !== _id);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const updateProductQuantity = (_id, quantity) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === _id) {
        cart[i].quantity = parseInt(quantity);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const getProductsFromCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const countProductsInCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
