const dbconn = require("../dbconfig");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const redirectURL = req.query.redirectURL;
  const { username, user_password } = req.body;
  // console.log(req.socket)

  dbconn.query(
    `select * from user where username="${username}"`,
    async (err, resUser) => {
      if (resUser.length === 0) {
        res.status(400).json({
          status: "Failed",
          message: "User not found",
        });
      }
      if (
        redirectURL === "http://localhost:3110" &&
        resUser[0].user_type !== "admin"
      ) {
        return res.status(401).json({
          status: "Failed",
          massage: "Unauthorized",
        });
      }
      const match = await bcrypt.compare(
        user_password,
        resUser[0].user_password
      );
      if (!match) {
        res.status(401).json({
          status: "Failed",
          message: "Wrong password or username",
        });
      } else {
        dbconn.query(
          `select url_id from url where url="${redirectURL}"`,
          (err, url) => {
            if (url.length === 0) {
              res.status(400).json({
                satus: "Failed",
                message: "Wrong url",
              });
            } else {
              const url_id = url[0].url_id;
              const user_id = resUser[0].user_id;
              dbconn.query(
                `select * from token where user_id="${user_id}"`, // ip adres eklenecek
                (err, db) => {
                  // if (db.length === 0) {
                  console.log("db sıfır ");
                  const token = uuidv4();
                  const m = new Date();
                  const nowDate =
                    m.getFullYear() +
                    "-" +
                    (m.getUTCMonth() + 1) +
                    "-" +
                    m.getDate() +
                    " " +
                    m.getHours() +
                    ":" +
                    m.getMinutes() +
                    ":" +
                    m.getSeconds();
                  dbconn.query(`  
         INSERT INTO token (token,created_at ,ttl,url,ip,user_id)
         VALUES ('${token}','${nowDate}',${5},${url_id},'${128}',${user_id})`);
                  const expired =
                    m.getFullYear() +
                    "-" +
                    (m.getUTCMonth() + 1) +
                    "-" +
                    m.getUTCDate() +
                    " " +
                    m.getHours() +
                    ":" +
                    m.getMinutes() +
                    ":" +
                    m.getSeconds();
                  res.status(200).json({
                    message: "Token Created",
                    token: token,
                    expired: expired, // ****
                  });
                  
                }
              );
            }
          }
        );
      }
    }
  );
};

exports.urls = (req, res) => {
  dbconn.query("select url from url", (err, urls) => {
    res.status(200).json({
      message: "All urls",
      urls,
    });
  });
};

exports.isAccessTokenValid = (req, res) => {
  const { url, token } = req.body;
  dbconn.query(`select url_id from url where url='${url}'`, (err, db) => {
    if (db.length === 0) {
      res.status(400).json({
        status: "Failed",
        message: "invalid URL",
      });
    } else {
      dbconn.query(
        `select * from token  where token="${token}"`,
        async (err, db) => {
          if (db.length === 1) {
            const resToken = db[0];
            const dbToken = resToken.token;
            const { created_at, ttl, user_id } = resToken;
            const nowDate = new Date();
            const dateDiffmn = Math.abs(nowDate - created_at) / (1000 * 60);
            const dateDiff = dateDiffmn >= ttl ? dateDiffmn : 0;
            dbconn.query(
              `select * from user where user_id="${user_id}"`,
              (err, user) => {
                if (
                  url === "http://localhost:3110" &&
                  user[0].user_type !== "admin"
                ) {
                  return res.status(200).json({
                    status: "Failed",
                    massage: "Unauthorized",
                  });
                }
                console.log("dateDiff: ", dateDiff);
                if (dateDiff >= ttl) {
                  dbconn.query(
                    `DELETE FROM token WHERE token="${token}"`,
                    () => {
                      res.status(200).json({
                        status: "Failed",
                        message: "out time token",
                      });
                    }
                  );
                } else {
                  res.status(200).json({
                    status: "Ok",
                    message: "token Validated",
                    
                  });
                }
              }
            );
          } else {
            res.status(200).json({
              message: "invalid Token",
            });
          }
        }
      );
    }
  });
};
