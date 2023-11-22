const express = require('express');
const pacienteController = require('./../controllers/pacienteController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').post(pacienteController.createPaciente);

router.post('/login', authController.loginPaciente);

module.exports = router;
