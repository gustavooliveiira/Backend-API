const express = require("express");
const presencasController = require("../controllers/presencasController.js");
const { verificarToken } = require("../middlewares/autentificacao.js");

const router = express.Router();

router.get("/", presencasController.listar);

router.post("/", presencasController.criar);

router.post("/login", presencasController.entrar);

router.post("/renovar", verificarToken, presencasController.renovar);

router.put(
  "/:id",
  verificarToken,
  presencasController.buscar,
  presencasController.atualizar
);

router.delete("/:id", verificarToken, presencasController.remover);

router.get("/:id", presencasController.buscar, presencasController.exibir);

module.exports = router;
