const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.route("/get-users").get(userController.getListOfUsers);
router.route("/create").post(userController.createUser);
router.route("/delete").delete(userController.deleteUser);
router.route("/get-user").get(userController.getUser);
router.route("/update-user").put(userController.updateUser);

module.exports = router;


