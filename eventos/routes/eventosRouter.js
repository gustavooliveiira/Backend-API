const express = require('express');
const eventosController = require('../controllers/eventosController.js');
const { verificarToken } = require('../middlewares/authMiddlewares.js');

const router = express.Router();

// ROTAS FIXAS PRIMEIRO
router.post('/login', eventosController.entrar);
router.post('/renovar', verificarToken, eventosController.renovar);

// CRUD
router.get('/', eventosController.listar);

router.post('/', eventosController.criar);

// GET precisa vir antes do PUT/DELETE
router.get('/:id', eventosController.buscar, eventosController.exibir);

router.put('/:id', verificarToken, eventosController.buscar, eventosController.atualizar);

router.delete('/:id', verificarToken, eventosController.buscar, eventosController.remover);

module.exports = router;
