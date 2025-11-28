const express = require('express');
const funcionariosController = require('../controllers/funcionariosController.js');
const { verificarToken } = require('../middlewares/authMiddlewares.js');

const router = express.Router();

router.get('/', funcionariosController.listar);

router.get('/:id', funcionariosController.buscarPorId, funcionariosController.exibir);

router.post('/', funcionariosController.criar);

router.post('/login', funcionariosController.entrar);

router.post('/renovar', verificarToken, funcionariosController.renovar);

router.put('/:id',  verificarToken, funcionariosController.buscarPorId, funcionariosController.atualizar);

router.delete('/:id', verificarToken, funcionariosController.remover);

module.exports = router;