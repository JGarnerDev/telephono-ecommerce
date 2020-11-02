const createProductCategory = (ProductCategory) => (name) => {
  const productCategory = new ProductCategory(name);
  return productCategory.save();
};

module.exports = (ProductCategory) => {
  return {
    createProductCategory: createProductCategory(ProductCategory),
  };
};
