const createProduct = (Product) => (productData) => {
  return new Product(productData);
};
const createAndSaveProduct = (Product) => (productData) => {
  const product = new Product(productData);
  return product.save();
};

const listProducts = (Product) => () => {
  return Product.find({});
};

module.exports = (Product) => {
  return {
    createProduct: createProduct(Product),
    createAndSaveProduct: createAndSaveProduct(Product),
    listProducts: listProducts(Product),
  };
};
