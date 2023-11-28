const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkSchema } = require('express-validator');
const userRegister = require('../validations/userRegister');
const userLogin = require("../validations/userLogin");

router.post('/register', checkSchema(userRegister), authController.register);
router.post('/login', checkSchema(userLogin), authController.login);

module.exports = router;