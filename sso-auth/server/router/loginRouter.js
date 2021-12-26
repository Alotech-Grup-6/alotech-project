const express = require("express");
const router = express.Router();

const loginController =require('../controller/loginController')

router.route('/login').post(loginController.login)
router.route('/urls').get(loginController.urls)
router.route('/valid-token').post(loginController.isAccessTokenValid)

module.exports = router;