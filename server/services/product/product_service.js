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

const decreaseProductQuantity = (Product) => (_id, deduction) => {
  return Product.updateOne(
    { _id },
    { $inc: { quantity: -deduction, sold: +deduction } }
  );
};

const listProducts = (Product) => (order, sortBy, limit) => {
  return Product.find({})
    .select(["-img"])
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit);
};

const listRelatedProducts = (Product) => (_id, category, limit) => {
  return Product.find({ _id: { $ne: _id }, category })
    .limit(limit)
    .populate("category", "_id name");
};

const listByFilter = (Product) => (sorting, limit, skip, filters) => {
  let searchParams = {};
  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "price") {
        searchParams[key] = {
          $gte: filters[key][0],
          $lte: filters[key][1],
        };
      } else {
        searchParams[key] = filters[key];
      }
    }
  }
  return Product.find(searchParams)
    .select(["-img"])
    .populate("category")
    .sort(sorting)
    .skip(skip)
    .limit(limit);
};

const listBySearchString = (Product) => (query) => {
  return Product.find(query).select(["-img"]);
};

const listProductCategories = (Product) => () => {
  return Product.distinct("category", {});
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
    listRelatedProducts: listRelatedProducts(Product),
    listProductCategories: listProductCategories(Product),
    listByFilter: listByFilter(Product),
    listBySearchString: listBySearchString(Product),
    decreaseProductQuantity: decreaseProductQuantity(Product),
  };
};
