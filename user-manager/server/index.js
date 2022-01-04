const express = require("express");

const cors = require("cors");
const logger = require("./dblogger");

const userRouter = require("./router/userRouter");

const app = express();
// .env config
require("dotenv").config();
// Define port
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);
// Logger middleware
app.use(logger);

app.use("/", userRouter);

app.listen(port, () => {
  console.log("server started", port);
});
