const createProduct = (Product) => (productData) => {
  return new Product(productData);
};
const createAndSaveProduct = (Product) => (productData) => {
  const product = new Product(productData);
  return product.save();
};

const findProductByID = (Product) => (_id) => {
  return Product.findOne({ _id });
};
const findProductInfoByID = (Product) => (_id) => {
  return Product.find({ _id }).select(["-img"]);
};

const findProductImageByID = (Product) => (_id) => {
  return Product.find({ _id }).select(["img"]);
};

const deleteProductById = (Product) => (_id) => {
  return Product.deleteOne({ _id });
};

const listProducts = (Product) => () => {
  return Product.find({});
};

module.exports = (Product) => {
  return {
    createProduct: createProduct(Product),
    createAndSaveProduct: createAndSaveProduct(Product),
    findProductByID: findProductByID(Product),
    findProductInfoByID: findProductInfoByID(Product),
    findProductImageByID: findProductImageByID(Product),
    deleteProductById: deleteProductById(Product),
    listProducts: listProducts(Product),
  };
};
