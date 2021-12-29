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

  // Successful Admin user login
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(200);
    tokenAdmin = response.body.token;
  });

  // Successful Normal user login
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "user",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(200);
    tokenUser = response.body.token;
  });

  // User doesn't exist
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "asdasd",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(400);
  });

  // User isn't Admin
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "user",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3110" });
    expect(response.statusCode).toBe(401);
  });
  // redirect url doen't exist
  test("responds to /login", async () => {
    const response = await request(app).post("/login").send({
      username: "admin",
      user_password: "test",
    });
    expect(response.statusCode).toBe(400);
  });

  // username or password doesn't match
  test("responds to /login", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        username: "admin",
        user_password: "asdasd",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response.statusCode).toBe(401);
  });

  // Check database Urls
  test("responds to /urls", async () => {
    const response = await request(app).get("/urls");
    expect(response.statusCode).toBe(200);
  });

  // Successful token check
  test("responds to /valid-token", async () => {
    const response = await request(app).post("/valid-token").send({
      url: "http://localhost:3110",
      token: tokenAdmin,
    });
    expect(response.statusCode).toBe(200);
  });

  // Checking token from unauthorized url
  test("responds to /valid-token", async () => {
    const response = await request(app).post("/valid-token").send({
      url: "http://localhost:7010",
      token: tokenAdmin,
    });
    expect(response.statusCode).toBe(400);
  });

  // Unauthorized user check
  test("responds to /valid-token", async () => {
    const response = await request(app).post("/valid-token").send({
      url: "http://localhost:3110",
      token: tokenUser,
    });
    expect(response.statusCode).toBe(401);
  });

  // expired or invalid token check
  test("responds to /valid-token", async () => {
    const response = await request(app).post("/valid-token").send({
      url: "http://localhost:3110",
      token: "ef18f6d7-1c47-44fc-854d-e696796cesdfsd",
    });
    expect(response.statusCode).toBe(400);
  });
});
