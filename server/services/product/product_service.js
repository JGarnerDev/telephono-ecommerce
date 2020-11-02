const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

const createProduct = (Product) => (productData) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  //  Error here
  form.parse(productData, (error, fields, files) => {
    if (error) {
      return res.status(500).json({
        error:
          "There was an error in processing the product data - try again later!",
      });
    }
    let product = new Product(fields);

    if (files.img) {
      product.img.data = fs.readFileSync(files.img.path);
      product.img.contentType = files.img.type;
    }
    return product.save((error, result) => {
      if (error) {
        return res.status(500).json({
          error: "FUCK",
        });
      }

      return;
    });
  });
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
