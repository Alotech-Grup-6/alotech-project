const dbconn = require("../dbconfig");

const bcrypt = require("bcrypt");

exports.getListOfUsers = async (req, res) => {
  await dbconn.query("call getListOfUsers", (err, result, fields) => {
    result = result[0];
    res.status(200).json({
      message: "Get Users List ",
      result,
    });
  });
};
// username, user_name, user_surname, user_password,user_email, user_type
exports.createUser = async (req, res) => {
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
  } = req.body;

  const hashed = await bcrypt.hash(user_password, 10);

  dbconn.query(
    `call createUser('${username}','${user_name}','${user_surname}','${hashed}','${user_email}','${user_type}')`,
    (err) => {
      if (err) {
        if ((err.code = "ER_DUP_ENTRY")) {
          return res.status(400).json({
            message: "Uniqelik Değeri",
          });
        }
      }
      dbconn.query(
        "SELECT * FROM user ORDER BY user_id DESC LIMIT 1",
        (err, result) => {
          res.status(201).json({
            status: "successful",
            message: "User Created",
            result,
          });
        }
      );
    }
  );
};

exports.deleteUser;
