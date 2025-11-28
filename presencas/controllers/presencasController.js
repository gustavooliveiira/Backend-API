const mongoose = require("mongoose");
const { gerarToken } = require("../middlewares/autentificacao.js");
const Presenca = require("../models/presencaModel.js");

async function listar(req, res) {
  try {
    const presencas = await Presenca.find({});
    return res.status(200).json(presencas);
  } catch (err) {
    return res.status(500).json({ msg: "Problema de conexão com o servidor" });
  }
}

async function criar(req, res) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(422).json({ msg: "Nome é obrigatório" });
  }

  try {
    const novaPresenca = await Presenca.create({
      nome: nome,
      presenca: true,
    });
    return res.status(201).json(novaPresenca);
  } catch (err) {
    return res.status(500).json({ msg: "Problema de conexão com o servidor" });
  }
}

async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }
  const presencaEncontrada = await Presenca.findOne({ _id: id });
  if (presencaEncontrada) {
    req.presencas = presencaEncontrada;
    return next();
  }
  return res.status(404).json({ msg: "Presença não encontrada" });
}

async function entrar(req, res) {
  const { nome } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(422).json({ msg: "Nome é obrigatório" });
  }

  const presencaEncontrada = await Presenca.findOne({ nome: nome });

  if (!presencaEncontrada) {
    return res.status(401).json({ msg: "Credenciais inválidas" });
  }

  const tokenResponse = gerarToken({
    id: presencaEncontrada._id,
    nome: presencaEncontrada.nome,
  });
  return res.status(200).json(tokenResponse);
}
async function renovar(req, res) {
  const novoToken = gerarToken({ nome: req.usuario.nome });
  return res.status(200).json({ token: novoToken.token });
}

function exibir(req, res) {
  return res.json(req.presencas);
}

async function atualizar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }
  const { nome, data } = req.body;
  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(422).json({ msg: "Nome é obrigatório" });
  }
  if (!data || typeof data !== "string" || data.trim() === "") {
    return res.status(422).json({ msg: "Data é obrigatória" });
  }
  const presenca = await Presenca.findById(id);
  if (!presenca) {
    return res.status(404).json({ msg: "Presença não encontrada" });
  }

  presenca.nome = nome;
  presenca.data = data;
  await presenca.save();

  return res.status(200).json(presenca);
}

async function remover(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const presencaEncontrada = await Presenca.findOneAndDelete({ _id: id });

  if (!presencaEncontrada) {
    return res.status(404).json({ msg: "Presença não encontrada" });
  }

  return res.status(204).json({});
}

module.exports = {
  listar,
  criar,
  buscar,
  entrar,
  renovar,
  exibir,
  atualizar,
  remover,
};
