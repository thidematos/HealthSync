const express = require('express');
const pacienteController = require('./../controllers/pacienteController');
const authController = require('./../controllers/authController');
const medicoController = require('./../controllers/medicoController');

const router = express.Router();

router
  .route('/')
  .post(pacienteController.createPaciente)
  .get(pacienteController.getAllPacientes);

router.post(
  '/schedule/:id',
  authController.protectPaciente,
  authController.restrictTo('paciente'),
  medicoController.schedule,
  pacienteController.schedule
);

router.post('/login', authController.loginPaciente);

module.exports = router;
