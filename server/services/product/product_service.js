const createProduct = (Product) => (name) => {
  if (!name) {
    throw new Error(`Name: ${name}`);
  }
  const product = new Product({ name });
  return product.save();
};

const listProducts = (Product) => () => {
  return Product.find({});
};

module.exports = (Product) => {
  return {
    createProduct: createProduct(Product),
    listProducts: listProducts(Product),
  };
};
