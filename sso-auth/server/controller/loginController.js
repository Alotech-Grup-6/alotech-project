const dbconn = require("../dbconfig");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// Login controller
exports.login = async (req, res) => {
  //  Get url, username and password info in request
  const redirectURL = req.query.redirectURL;
  const { username, user_password } = req.body;

  // Query whether the user is in the database
  dbconn.query(
    `select * from user where username="${username}"`,
    async (err, resUser) => {
      if (resUser.length === 0) {
        // Return error message if user doesn't exist
        return res.status(404).json({
          status: "Failed",
          message: "User not found",
        });
      }
      // if url is user-manager module then check if the user is admin
      if (
        redirectURL === "http://localhost:3110" &&
        resUser[0].user_type !== "admin"
      ) {
        // Return error message if user type is not admin
        return res.status(401).json({
          status: "Failed",
          message: "Unauthorized",
        });
      }
      //Check password and hashed password
      const match = await bcrypt.compare(
        user_password,
        resUser[0].user_password
      );
      // Return error message if password and hashed password is not match.
      if (!match) {
        res.status(401).json({
          status: "Failed",
          message: "Wrong password or username",
        });
      } else {
        // Check if redirectUrl exists in database
        dbconn.query(
          `select url_id from url where url="${redirectURL}"`,
          (err, url) => {
            if (url.length === 0) {
              // Return error message if redirectUrl is not existing the database.
              res.status(400).json({
                satus: "Failed",
                message: "Wrong url",
              });
            } else {
              const url_id = url[0].url_id;
              const user_id = resUser[0].user_id;
              // Get all token info by user_id
              dbconn.query(
                `select * from token where user_id="${user_id}"`,
                (err, db) => {
                  // Generate the token with uuid
                  const token = uuidv4();
                  // Define the now date
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
                  // Create token by insert query
                  dbconn.query(`  
         INSERT INTO token (token,created_at ,ttl,url,ip,user_id)
         VALUES ('${token}','${nowDate}',${5},${url_id},'${128}',${user_id})`);
                  res.status(200).json({
                    message: "Token Created",
                    token: token,
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

// Get all urls
exports.urls = (req, res) => {
  dbconn.query("select url from url", (err, urls) => {
    res.status(200).json({
      message: "All urls",
      urls,
    });
  });
};

exports.isAccessTokenValid = (req, res) => {
  // Get url and token info in request
  const { url, token } = req.body;
  //  Check if url exists in database
  dbconn.query(`select url_id from url where url='${url}'`, (err, db) => {
    if (db.length === 0) {
      // return error message if url is not existing the database.
      res.status(400).json({
        status: "Failed",
        message: "invalid URL",
      });
    } else {
      // Get all token column with token by select query
      dbconn.query(
        `select * from token  where token="${token}"`,
        async (err, db) => {
          if (db.length === 1) {
            // if token existing
            const resToken = db[0];
            // Define created_at,ttl and user_id by object destruction
            const { created_at, ttl, user_id } = resToken;
            const nowDate = new Date();
            // Calculate difference with token generation time
            // Convert ms to minute
            const dateDiffmn = Math.abs(nowDate - created_at) / (1000 * 60);
            // Define timediff to zero if timediff smaller than ttl
            const dateDiff = dateDiffmn >= ttl ? dateDiffmn : 0;
            dbconn.query(
              // Get all users column with user_id by select query
              `select * from user where user_id="${user_id}"`,
              (err, user) => {
                if (
                  // if url is user-manager module then check if the user is admin
                  url === "http://localhost:3110" &&
                  user[0].user_type !== "admin"
                ) {
                  return res.status(401).json({
                    status: "Failed",
                    message: "Unauthorized",
                  });
                }
                // Delete token if timeDiff grater than ttl
                if (dateDiff >= ttl) {
                  dbconn.query(
                    `DELETE FROM token WHERE token="${token}"`,
                    () => {
                      res.status(400).json({
                        status: "Failed",
                        message: "out time token",
                      });
                    }
                  );
                } else {
                  // Return success message if everything okay
                  res.status(200).json({
                    status: "Ok",
                    message: "token Validated",
                    user_id: user_id,
                  });
                }
              }
            );
          } else {
            res.status(400).json({
              message: "invalid Token",
            });
          }
        }
      );
    }
  });
};
