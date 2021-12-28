const express = require("express");

const log4js = require("log4js");
const dbconn = require("./dbconfig");

require("dotenv").config();
const cors = require("cors");
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


const logger = log4js.getLogger();

log4js.addLayout("json", function (config) {
  return function (logEvent) {
    console.log(logEvent.data[0]);
    var sqlQuery = `INSERT INTO logs (information, data) values ('${logEvent.level.levelStr}', '${logEvent.data}')`;

    dbconn.query(sqlQuery, function (err) {
      if (err) console.log(err);
      console.log("eklendi");
    });
    return (
      JSON.stringify(logEvent.data) +
      config.separator +
      [logEvent.level.levelStr]
    );
  };
});

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: { type: "json", separator: ",", pattern: "%d %p %c %X" },
    },
  },
  categories: {
    default: { appenders: ["out"], level: "all" },
  },
});

app.use(log4js.connectLogger(logger, { level: "auto" }));

app.use("/", userRouter);

app.listen(port, () => {
  console.log("server started", port);
});
