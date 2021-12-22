const dbconn = require("../dbconfig");

exports.getListOfUsers = async (req, res) => {
  await dbconn.query("call getListOfUsers", (err, result, fields) => {
    result = result[0];
    res.status(200).json({
      message: "Test",
      result,
    });
  });
};
exports.deleteUser
