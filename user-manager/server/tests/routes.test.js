const request = require("supertest");
const express = require("express");
const routes = require("../router/userRouter");

const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

describe("CRUD Operations Tests", () => {
  test("responds to /get-users", async () => {
    const res = await request(app).get("/get-users");
    expect(res.statusCode).toBe(200);
  });

  test("respond to /create", async () => {
    const res = await request(app).post("/create").send({
      username: "jest",
      user_name: "EmreJest",
      user_surname: "PalaJest",
      user_password: "asdfgf",
      user_email: "jest11@hotmail.com",
      user_type: "Admin",
    });
    expect(res.statusCode).toBe(201);
  });

  test("respond to /delete", async () => {
    const res = await request(app).delete("/delete").send({
      user_id: "69",
    });
    expect(res.statusCode).toBe(200);
  });

  test("responds to /get-user", async () => {
    const response = await request(app).get("/get-user").send({
      user_id: "34",
    });
    expect(response.statusCode).toBe(200);
  });

  test("respond to /update-user", async () => {
    const res = await request(app).put("/update-user").send({
      user_id: "34",
      username: "IMEx",
      user_name: "İlkay",
      user_surname: "PalaJest",
      user_password: "asdfgf",
      user_email: "jest12@hotmail.com",
      user_type: "Admin",
    });
    expect(res.statusCode).toBe(200);
  });
});
