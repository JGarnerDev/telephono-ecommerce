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

    cart = Array.from(new Set(cart.map((p) => p._id))).map((_id) => {
      return cart.find((p) => p._id === _id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
