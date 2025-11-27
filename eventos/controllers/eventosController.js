const mongoose = require("mongoose");
const { criarData, gerarToken, compararData } = require('../middlewares/authMiddlewares');
const Evento = require('../models/eventosModel.js');

// LISTAR
async function listar(req, res) {
  try {
    const eventos = await Evento.find({});
    return res.json(eventos);
  } catch (err) {
    return res.status(500).json({ msg: "Problema de conexão com o servidor" });
  }
}

// CRIAR
async function criar(req, res) {
  try {
    const { nome, data } = req.body;

    // valida campos obrigatórios
    if (!nome || !data) {
      return res.status(422).json({ msg: 'Nome e Data são obrigatórios' });
    }

    const dataCriada = criarData(data);

    // Criar evento
    const novoEvento = await Evento.create({
      nome,
      data: dataCriada
    });

    return res.status(201).json(novoEvento);

  } catch (err) {
    return res.status(500).json({ msg: 'Erro no servidor' });
  }
}

// MIDDLEWARE buscar() por ID
async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const eventoEncontrado = await Evento.findOne({ _id: id });
  if (eventoEncontrado) {
    req.eventos = eventoEncontrado;
    return next();
  }

  return res.status(404).json({ msg: "Evento não encontrado" });
}

// LOGIN
async function entrar(req, res) {
  const eventoEncontrado = await Evento.findOne({ nome: req.body.nome });

  if (eventoEncontrado) {
    const confere = compararData(req.body.data, eventoEncontrado.data);

    if (confere) {
      const token = gerarToken({ nome: req.body.nome });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }
  } else {
    return res.status(401).json({ msg: 'Credenciais inválidas' });
  }
}

// RENOVAR TOKEN
async function renovar(req, res) {
  const novoToken = gerarToken({ nome: req.usuario.nome });
  return res.status(200).json({ token: novoToken });
}

// EXIBIR
function exibir(req, res) {
  return res.json(req.eventos);
}

// ATUALIZAR
async function atualizar(req, res) {
  const { id } = req.params;
  const { nome, data } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(422).json({ msg: "nome do evento é obrigatorio" });
  }

  if (!data || typeof data !== "string" || data.trim() === "") {
    return res.status(422).json({ msg: "data do evento é obrigatorio" });
  }

  const evento = await Evento.findById(id);
  if (!evento) {
    return res.status(404).json({ msg: "Evento não encontrado" });
  }

  evento.nome = nome;
  evento.data = criarData(data);
  await evento.save();

  return res.status(200).json(evento);
}

// REMOVER
async function remover(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const eventoEncontrado = await Evento.findOneAndDelete({ _id: id });

  if (!eventoEncontrado) {
    return res.status(404).json({ msg: "Evento não encontrado" });
  }

  return res.status(204).json({});
}

module.exports = { listar, criar, buscar, entrar, renovar, exibir, atualizar, remover };
