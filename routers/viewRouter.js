const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const chatController = require('./../utils/chatController');
const roomController = require('./../controllers/roomController');
const medicoController = require('./../controllers/medicoController');

const router = express.Router();

router.get('/', viewController.index);

router.get('/login/:user?', viewController.login);

router.get('/cadastro-medico', viewController.cadastroMedico);

router.get(
  '/medico-overview',
  authController.protect,
  authController.restrictTo('medico'),
  viewController.medicoOverview
);

router.get(
  '/paciente-overview',
  authController.protectPaciente,
  authController.restrictTo('paciente'),
  viewController.pacienteOverview
);

router.get(
  '/chat',
  authController.protect,
  authController.restrictTo('medico'),
  viewController.chat
);

router.get(
  '/chat/:speciality',
  authController.protect,
  authController.restrictTo('medico'),
  viewController.specialityChat
);

router.get(
  '/chat-room/:id',
  authController.protect,
  authController.restrictTo('medico'),
  chatController.chatWith,
  viewController.chatRoom
);

router.get(
  '/conversas',
  authController.protect,
  authController.restrictTo('medico'),
  roomController.getUserRooms,
  medicoController.getMedicosHasChat,
  viewController.conversas
);

router.get(
  '/medicos',
  authController.protectPaciente,
  authController.restrictTo('paciente'),
  viewController.medicos
);

router.get(
  '/medicos/:id',
  authController.protectPaciente,
  authController.restrictTo('paciente'),
  medicoController.getMedico,
  viewController.medicoDetails
);

module.exports = router;
