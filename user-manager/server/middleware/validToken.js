const axios = require("axios");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const url = req.headers.origin;

    const valid = await axios.post("http://localhost:3000/valid-token", {
      url: url,
      token: token,
    });
    if (valid.data.message !== "token Validated") {
      res.status(200).json({
        status: "failed",
        message: "invalid token",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(200).json({
      status: "failed",
      message: "invalid tokenn",
    });
  }
};
