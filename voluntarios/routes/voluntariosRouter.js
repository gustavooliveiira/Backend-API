const express = require('express');
const voluntariosController = require('../controllers/voluntariosController.js');
const { verificarToken } = require('../middlewares/authMiddlewares.js');

const router = express.Router();

router.post('/', voluntariosController.criar);

router.post('/login', voluntariosController.entrar);

router.post('/renovar',  verificarToken, voluntariosController.renovar);

router.delete('/:id', verificarToken, voluntariosController.remover);

module.exports = router;