const express = require("express");

require("dotenv").config();
const cors = require("cors");
const logger=require("./dblogger")
const app = express();
const port = process.env.PORT;

const userRouter = require("./router/userRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

app.use(logger);

app.use("/", userRouter);

app.listen(port, () => {
  console.log("server started", port);
});
