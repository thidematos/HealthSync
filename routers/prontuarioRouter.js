const express = require('express');
const authController = require('./../controllers/authController');
const prontuarioController = require('./../controllers/prontuarioController');
const medicoController = require('./../controllers/medicoController');
const pacienteController = require('./../controllers/pacienteController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('medico'),
    medicoController.postProntuario,
    prontuarioController.createProntuario,
    pacienteController.postProntuario
  );

module.exports = router;
