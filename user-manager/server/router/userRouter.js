const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.route("/get-users").get(userController.getListOfUsers);
router.route("/create").post(userController.createUser);

module.exports = router;
