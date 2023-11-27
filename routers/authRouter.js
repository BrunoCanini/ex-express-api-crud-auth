const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkSchema } = require('express-validator');
const userRegister = require('../validations/userRegister');

router.post('/register', checkSchema(userRegister), authController.register);
router.post('/login', checkSchema(userRegister), authController.login);

module.exports = router;