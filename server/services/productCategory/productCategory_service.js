const createProductCategory = (ProductCategory) => (name) => {
  const productCategory = new ProductCategory(name);
  return productCategory.save();
};
//
const findCategoryById = (ProductCategory) => (_id) => {
  return ProductCategory.findOne({ _id });
};
//
const updateCategoryById = (ProductCategory) => (_id, updateData) => {
  return ProductCategory.updateOne({ _id }, updateData);
};
//
const deleteCategoryById = (ProductCategory) => (_id) => {
  return ProductCategory.remove({ _id }, { justOne: true });
};
//
const listProductCategories = (ProductCategory) => () => {
  return Product.find({});
};

module.exports = (ProductCategory) => {
  return {
    createProductCategory: createProductCategory(ProductCategory),
    findCategoryById: findCategoryById(ProductCategory),
    updateCategoryById: updateCategoryById(ProductCategory),
    deleteCategoryById: deleteCategoryById(ProductCategory),
  };
};
