var app = require("../app");
var request = require("supertest");
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test_db";

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
    server.close(done);
  });

  describe("User routes", () => {
    it("brings a single user by querying id", async () => {
      const id = Math.random();
      await request(server).get(`/users/${id}`).expect(200);
    });
  });
  describe("Product routes", () => {
    it("brings a single user by querying id", async () => {
      const id = Math.random();
      await request(server).get(`/products/${id}`).expect(200);
    });
  });
});
