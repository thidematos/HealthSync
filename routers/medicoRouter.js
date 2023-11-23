const express = require('express');
const medicoController = require('./../controllers/medicoController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(medicoController.createMedico)
  .get(medicoController.getAllMedicos)
  .delete(medicoController.deleteAll);

router.post('/login', authController.login);

module.exports = router;
