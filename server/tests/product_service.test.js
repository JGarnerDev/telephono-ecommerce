const ProductService = require("../services/product/product_service");
const sinon = require("sinon");

describe("Product service", () => {
  it("has a module", () => {
    expect(ProductService).toBeDefined();
  });

  describe("listUsers method", () => {
    it("is called when evoked", () => {
      const mockProductModel = {
        find: sinon.spy(),
      };
      const productService = ProductService(mockProductModel);
      productService.listUsers();
      const functionWasCalledOnce = mockProductModel.find.calledOnce;
      expect(functionWasCalledOnce).toBeTruthy();
    });
  });

  describe("createProduct method", () => {
    it("is called when evoked", () => {
      const save = sinon.spy();
      let name;

      const MockModel = function (data) {
        name = data.name;
        return {
          ...data,
          save,
        };
      };

      const productService = ProductService(MockModel);

      productService.createProduct("Test");

      const functionWasCalledOnce = save.calledOnce;
      expect(functionWasCalledOnce).toBeTruthy();
    });
  });
});
