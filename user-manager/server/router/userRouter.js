const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const validToken=require("../middleware/validToken")

router.route("/get-users").get(validToken,userController.getListOfUsers);
router.route("/create").post(validToken,userController.createUser);
router.route("/delete").delete(validToken,userController.deleteUser);
router.route("/get-user").get(validToken,userController.getUser);
router.route("/update-user").put(validToken,userController.updateUser);


module.exports = router;
