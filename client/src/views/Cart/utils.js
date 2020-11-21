export const addProduct = (product) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      quantity: 1,
    });

    cart = Array.from(new Set(cart.map((product) => product._id))).map(
      (_id) => {
        return cart.find((product) => product._id === _id);
      }
    );

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

export const countCartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};
