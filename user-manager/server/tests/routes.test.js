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

describe("CRUD Operations Tests",  () => {
  let adminToken = "";
  let userToken = "";

  // Get tokens for admin and normal user before all tests start
  beforeAll(async () => {
    const response = await request(appAuth)
      .post("/login")
      .send({
        username: "admin",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3110" });
    expect(response.statusCode).toBe(200);
    adminToken = response.body.token;

    const response2 = await request(appAuth)
      .post("/login")
      .send({
        username: "user",
        user_password: "test",
      })
      .query({ redirectURL: "http://localhost:3020" });
    expect(response2.statusCode).toBe(200);
    userToken = response2.body.token;
  });

  // Admin user successfully getting user list
  test("responds to /get-users", async () => {
    const response = await request(app)
      .get("/get-users")
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(response.statusCode).toBe(200);
  });

  // Normal user cannot get user list (Unauthorized)
  test("responds to /get-users", async () => {
    const response = await request(app)
      .get("/get-users")
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);
    expect(response.statusCode).toBe(401);
    console.log(response);
  });
  
  // Admin successfully create a new user
  test("respond to /create", async () => {
    const res = await request(app)
      .post("/create")
      .send({
        username: "Alotech",
        user_name: "Alotech",
        user_surname: "Alotech",
        user_password: "denemeAlotech",
        user_email: "alotech@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(201);
  });


  // Normal User can't create a new user (Unauthorized)
  test("respond to /create", async () => {
    const res = await request(app)
      .post("/create")
      .send({
        username: "Alotech",
        user_name: "Alotech",
        user_surname: "Alotech",
        user_password: "Alotech",
        user_email: "Alotech@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(401);
  });


  // Normal user can't delete a user (Unauthorized)
  test("respond to /delete", async () => {
    const res = await request(app)
      .delete("/delete")
      .send({
        user_id: "3",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(401);
  });

  // There is no user to delete
  test("respond to /delete", async () => {
    const res = await request(app)
      .delete("/delete")
      .send({
        user_id: "00000", // User does not exist
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });

  // Admin successfully update a user
  test("respond to /update-user", async () => {
    const res = await request(app)
      .put("/update-user")
      .send({
        user_id: "3",
        username: "sonnn",
        user_name: "İlkayy",
        user_surname: "asdads",
        user_email: "d@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  // Normal User can't update a user (Unauthorized)
  test("respond to /update-user", async () => {
    const res = await request(app)
      .put("/update-user")
      .send({
        user_id: "3",
        username: "sonn",
        user_name: "İlkay",
        user_surname: "asdads",
        user_email: "d@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(401);
  });

  // a non-existent user cannot be updated
  test("respond to /update-user", async () => {
    const res = await request(app)
      .put("/update-user")
      .send({
        user_id: "000",
        username: "sonn",
        user_name: "İlkay",
        user_surname: "PalaJest",
        user_password: "asdfgf",
        user_email: "123456@hotmail.com",
        user_type: "admin",
      })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(404);
  });

  // Admin successfully received  single user
  test("responds to /get-user", async () => {
    const response = await request(app)
      .get("/get-user")
      .query({ user_id: "1" })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
  });

  // Normal user can't received single user (Unauthorized)
  test("responds to /get-user", async () => {
    const response = await request(app)
      .get("/get-user")
      .query({ user_id: "1" })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.statusCode).toBe(401);
  });

  // User doesn't exist
  test("responds to /get-user", async () => {
    const response = await request(app)
      .get("/get-user")
      .query({ user_id: "0000" })
      .set("Origin", "http://localhost:3110")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(404);
  });
});
