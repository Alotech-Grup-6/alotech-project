const request = require("supertest");
const express = require("express");
const routes = require("../router/userRouter");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

const routesAuth = require("../../../sso-auth/server/router/loginRouter");
const appAuth = new express();
appAuth.use(express.json());
appAuth.use(express.urlencoded({ extended: true }));
appAuth.use("/", routesAuth);

describe("CRUD Operations Tests", () => {
  let adminToken = "";
  let userToken = "";

  beforeAll(async () => {
    const response = await request(app2)
      .post("/login")
      .send({
        username: "Emre",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3110" });
    expect(response.statusCode).toBe(200);
    adminToken = response.body.token;

    const response2 = await request(appAuth)
      .post("/login")
      .send({
        username: "test",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response2.statusCode).toBe(200);
    userToken = response2.body.token;
  });

  test("responds to /get-users", async () => {
    const response = await request(app)
      .get("/get-users")
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
  });
  test("responds to /get-users", async () => {
    const response = await request(app)
      .get("/get-users")
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(404);
  });
  /*
  test("respond to /create", async () => {
    const res = await request(app)
      .post("/create")
      .send({
        username: "yeni",
        user_name: "yenii",
        user_surname: "PalaJest",
        user_password: "asdfgf",
        user_email: "1234@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(201);
  });

  test("respond to /delete", async () => {
    const res = await request(app)
      .delete("/delete")
      .send({
        user_id: "132",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test("respond to /delete", async () => {
    const res = await request(app)
      .delete("/delete")
      .send({
        user_id: "asda", // User does not exist
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
  */

  /*
  test("respond to /update-user", async () => {
    const res = await request(app)
      .put("/update-user")
      .send({
        user_id: "126",
        username: "IMEx",
        user_name: "İlkay",
        user_surname: "PalaJest",
        user_password: "asdfgf",
        user_email: "1234@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  }); 


  test("responds to /get-user", async () => {
    const response = await request(app)
      .get("/get-user")
      .query({ user_id: "103" })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
  });
  */
});
