const express = require('express');
const eventosController = require('../controllers/eventosController.js');
const { verificarToken } = require('../middlewares/authMiddlewares.js');

const router = express.Router();

router.get('/', eventosController.listar);

router.get('/:id', eventosController.buscar, eventosController.exibir);

router.post('/', eventosController.criar);

router.post('/login', eventosController.entrar);

router.post('/renovar',  verificarToken, eventosController.renovar);

router.put('/:id', verificarToken, eventosController.buscar, eventosController.atualizar);

router.delete('/:id', verificarToken, eventosController.remover);

module.exports = router;