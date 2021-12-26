const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
<<<<<<< HEAD

router.route("/get-users").get(userController.getListOfUsers);
router.route("/create").post(userController.createUser);
router.route("/delete").delete(userController.deleteUser);
router.route("/get-user").get(userController.getUser);
router.route("/update-user").put(userController.updateUser);

module.exports = router;


=======

router.route("/get-users").get(userController.getListOfUsers);
router.route("/create").post(userController.createUser);

module.exports = router;
>>>>>>> f1cd7c8abd23bbbb0871de5fad23367115510d58
