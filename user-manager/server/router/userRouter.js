const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const validToken=require("../middleware/validToken")

router.route("/get-users").get(validToken,userController.getListOfUsers);
router.route("/create").post(validToken,userController.createUser);

module.exports = router;
