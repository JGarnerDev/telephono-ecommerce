var app = require("../app");
var request = require("supertest");
var mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test_db";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

describe("App test", () => {
  describe("Sanity Tests", () => {
    it("has a module", () => {
      expect(app).toBeDefined();
    });
  });

  let server;

  beforeAll(() => {
    server = app.listen(8888);
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close(done);
  });

  // Testing of 'sitename.com/users' endpoint and all endpoints that are extensions thereafter
  describe("User routes", () => {
    it(" responds with code 500 (server internal error) at '/users' when not given a password ", async (done) => {
      await request(server)
        .post(`/users`)
        .send({ pw: "wrong password" })
        .expect((res) => {
          expect(res.status).toBe(500);
        });
      done();
    });
    it(" responds with code 200 (OK) at '/users' when given a password ", async (done) => {
      await request(server)
        .post(`/users`)
        .send({ pw: process.env.DB_PASS })
        .expect((res) => {
          expect(res.status).toBe(200);
          const listOfUsers = res.body;
          expect(Array.isArray(listOfUsers)).toBeTruthy();
        });
      done();
    });
  });

  // Testing of 'sitename.com/products' endpoint and all endpoints that are extensions thereafter
  describe("Product routes", () => {
    it(" responds with code 200 (OK) at '/products' ", async (done) => {
      await request(server).get(`/products`).expect(200);
      done();
    });
  });
});
