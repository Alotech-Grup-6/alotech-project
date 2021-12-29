const dbconn = require("./dbconfig");
const log4js = require("log4js");

const logger = log4js.getLogger();

log4js.addLayout("json", function (config) {
  return function (logEvent) {
    const sqlQuery = `INSERT INTO logs (information, data) values ('${logEvent.level.levelStr}', '${logEvent.data}')`;

    dbconn.query(sqlQuery, function (err) {
      if (err) {
        console.log("error")
      }
    });
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


const loggers= log4js.connectLogger(logger, { level: "auto" });
module.exports=loggers
