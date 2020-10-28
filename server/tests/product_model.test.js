var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test_db";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const Product = require("../services/product/product_model");

describe("Product model", () => {
  beforeAll(async () => {
    // Since each test involves the making of a single user, we exercise caution by deleting a user object (if it exists) before every test...
    await Product.deleteOne({});
    // ...and confirm the database to have no user objects
    const anyProduct = await Product.findOne({});
    expect(anyProduct).toBeNull();
  });

  afterEach(async () => {
    // We delete the user object made during a test
    await Product.deleteOne({});
    // ...and to make sure we were not making excessive user objects, we confirm again that there are none
    const anyProduct = await Product.findOne({});
    expect(anyProduct).toBeNull();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has a module", () => {
    expect(Product).toBeDefined();
  });

  describe("Saving a product object", () => {
    it("saves a product object to the database", async () => {
      // Declare product properties and retain them
      const name = "save-test";
      // Make a new product
      const product = new Product({ name });
      // Save it to our test database
      const savedProduct = await product.save();
      // Delcare a new value based on the saved object
      const actual = savedProduct.name;
      // Expect them to be the same
      expect(actual).toEqual(name);
    });
  });

  describe("Getting a product object", () => {
    it("retrieves an existing product object from the database", async () => {
      // Declare product properties and retain them
      const name = "get-test";
      // Make a new product
      const product = new Product({ name });
      // Save it to our test database
      await product.save();
      // Attempt to find it by a retained property
      const found = await Product.findOne({ name });
      // Delcare a new value based on the retrieved object
      const actual = found.name;
      // Expect them to be the same
      expect(actual).toEqual(name);
    });
  });

  describe("Updating a product object", () => {
    it("updates an existing product object in the database", async () => {
      // Declare product properties and retain them
      const name = "update-test";
      const updatedName = "I've been updated!";
      // Make a new product
      const product = new Product({ name });
      // Save it to our test database
      await product.save();
      // Attempt to update the product object
      product.name = updatedName;
      await product.save();
      // Attempt to find product by original name, expecting nothing to be found
      const productWithOldProperties = await Product.findOne({ name });
      expect(productWithOldProperties).toBeNull();
      // Attempt to find product by updated name, expecting the product to be found
      const updatedProduct = await Product.findOne({ name: updatedName });
      const productName = updatedProduct.name;
      // Compare values to confirm
      expect(productName).toEqual(updatedName);
    });
  });

  describe("Deleting a product object", () => {
    it("deletes an existing product object in the database", async () => {
      // Declare product properties and retain them
      const name = "delete-test";
      // Make a new product
      const product = new Product({ name });
      // Save it to our test database
      await product.save();
      // Attempt to delete in by name query
      await product.deleteOne({ name });
      // Attempt to find the deleted product by name
      const foundProduct = await Product.findOne({ name });
      // Expect this to return null
      expect(foundProduct).toBeNull();
      // Expect there to be no products at all in this context (just to be safe)
      const anyProduct = await Product.findOne({});
      expect(anyProduct).toBeNull();
    });
  });
});
