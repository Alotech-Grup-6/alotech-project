const axios = require("axios");

// This middleware checks token validity on every request made
module.exports = async (req, res, next) => {
  try {
    // Get token by request headers
    const token = req.headers.authorization.split(" ")[1];
    const url = req.headers.origin;
    // Make request by sending url and token
    const valid = await axios.post("http://localhost:3000/valid-token", {
      url: url,
      token: token,
    });
    // return error message if response message is not token validated
    if (valid.data.message !== "token Validated") {
      res.status(400).json({
        status: "failed",
        message: "invalid token",
      });
    } else {
      // Next other controller if everything okay
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "invalid token",
      err: error,
    });
  }
};
