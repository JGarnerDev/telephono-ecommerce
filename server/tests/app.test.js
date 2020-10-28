var app = require("../app");
var request = require("supertest");
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test_db";

mongoose.connect(mongoDB);

describe("App test", () => {
  describe("Sanity Tests", () => {
    it("has a module", () => {
      expect(app).toBeDefined();
    });
  });

  let server;

  beforeAll(() => {
    server = app.listen(3001);
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });

  // Testing of 'sitename.com/users' endpoint and all endpoints that are extensions thereafter
  describe("User routes", () => {
    it(" '/users' responds with code 200 (OK) ", async (done) => {
      await request(server).get(`/users`).expect(200);
      done();
    });
  });
  // Testing of 'sitename.com/products' endpoint and all endpoints that are extensions thereafter
  describe("Product routes", () => {
    it(" '/products' responds with code 200 (OK) ", async (done) => {
      await request(server).get(`/products`).expect(200);
      done();
    });
  });
});
