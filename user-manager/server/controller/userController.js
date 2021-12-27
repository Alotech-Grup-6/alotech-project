const dbconn = require("../dbconfig");

const bcrypt = require("bcrypt");
// Get all Users

exports.getListOfUsers = async (req, res) => {
  await dbconn.query("call getListOfUsers", (err, result, fields) => {
    result = result[0];
    res.status(200).json({
      message: "Get Users List ",
      result,
    });
  });
};

// Create Single User
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

// Delete single User
exports.deleteUser = async (req, res) => {
  const { user_id } = req.body;

  await dbconn.query(`call getUserInfo('${user_id}')`, (err, result) => {
    result = result[0];
    if (result.length != 0) {
      dbconn.query(`call deleteUser('${user_id}')`, (err) => {
        res.status(200).json({
          status: "successful",
          message: "Deleted",
        });
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "User does not exist",
      });
    }
  });
};

// Get single User
exports.getUser = (req, res) => {
  const { user_id } = req.query;

  dbconn.query(`call getUserInfo('${user_id}')`, (err, result) => {
    result = result[0];
    if (result.length != 0) {
      res.status(200).json({
        status: "successful",
        message: "User Exist",
        result,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "User does not exist",
      });
    }
  });
};

//Update single User
exports.updateUser = async (req, res) => {
  const {
    user_id,
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
  } = req.body;

  await dbconn.query(`call getUserInfo('${user_id}')`, (err, result) => {
    result = result[0];
    if (result.length != 0) {
      dbconn.query(
        `call updateUser('${user_id}','${username}','${user_name}','${user_surname}','${user_password}','${user_email}','${user_type}')`,
        (err) => {
          if (err) throw err;
          res.status(200).json({
            status: "successful",
            message: "Updated",
          });
        }
      );
    } else {
      res.status(404).json({
        status: "failed",
        message: "User does not exist",
      });
    }
  });
};
