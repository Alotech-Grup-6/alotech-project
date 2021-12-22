const express = require("express");
const router = express.Router();

const userController =require('../controller/userController')

router.route('/get-users').get(userController.getListOfUsers)
module.exports = router;