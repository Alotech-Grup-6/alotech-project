const request = require("supertest");
const express = require("express");
const routes = require("../router/loginRouter");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

describe("CRUD Operations Tests", () => {
  let tokenAdmin = "";
  let tokenUser = "";
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "Emre",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(200);
    tokenAdmin = response.body.token;
  });

  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "test",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(200);
    tokenUser = response.body.token;
  });

  // redirect url yok
  test("responds to /login", async () => {
    const response = await request(app).post("/login").send({
      username: "Emre",
      user_password: "test",
    });
    expect(response.statusCode).toBe(400);
  });

  test("responds to /urls", async () => {
    const response = await request(app).get("/urls");
    expect(response.statusCode).toBe(200);
  });

  test("responds to /valid-token", async () => {
    const response = await request(app).post("/valid-token").send({
      url: "http://localhost:3110",
      token: tokenAdmin,
    });
    expect(response.statusCode).toBe(200);
  });
});
