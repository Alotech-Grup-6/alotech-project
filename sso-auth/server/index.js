const express = require("express");

const app = express();

const cors = require("cors");
const logger = require("./dblogger");
require("dotenv").config();

const loginRouter = require("./router/loginRouter");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger);

app.use("/", loginRouter);

app.listen(port, () => {
  console.log("server started", port);
});
