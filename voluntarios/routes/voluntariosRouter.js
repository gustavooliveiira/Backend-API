const express = require('express');
const voluntariosController = require('../controllers/voluntariosController.js');
const { verificarToken } = require('../middlewares/authMiddlewares.js');

const router = express.Router();

router.get('/', voluntariosController.listar);

router.get('/:id', voluntariosController.buscar, voluntariosController.exibir);

router.post('/', voluntariosController.criar);

router.post('/login', voluntariosController.entrar);

router.post('/renovar',  verificarToken, voluntariosController.renovar);

router.put('/:id', verificarToken, voluntariosController.buscar, voluntariosController.atualizar);

router.delete('/:id', verificarToken, voluntariosController.remover);

module.exports = router;