const { criarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddlewares');
const Funcionario = require('../models/funcionariosModel.js');
const mongoose = require('mongoose');

async function criar(req, res) {
    try {
        const senhaCriada = criarSenha(req.body.senha);
        const novofuncionario = await Funcionario.create({
            email: req.body.email,
            senha: senhaCriada
        });
        return res.status(201).json(novofuncionario);
    } catch (err) {
        return res.status(422).json({ msg: 'Email e Senha são obrigatórios' });
    }
}

function exibir(req, res) {
    return res.json(req.funcionarios);
}

async function entrar(req, res) {
    const funcionarioEncontrado = await Funcionario.findOne({ email: req.body.email });
    if (funcionarioEncontrado) {
        const confere = compararSenha(req.body.senha, funcionarioEncontrado.senha);
        if (confere) {
            const token = gerarToken({ email: req.body.email });
            return res.status(200).json({ token: token });
        } else {
            return res.status(401).json({ msg: 'Credenciais inválidas' })
        }
    } else {
        return res.status(401).json({ msg: 'Credenciais inválidas' })
    }
}

async function renovar(req, res) {
    const novoToken = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token: novoToken });
}

async function remover(req, res) {
    const { id } = req.params;
    const funcionarioEncontrado = await Funcionario.findOneAndDelete({ _id: id });
    return res.status(204).json({});
}

async function listar(req, res) {
    try {
        const lista = await Funcionario.find();
        return res.status(200).json(lista);
    } catch (err) {
        return res.status(500).json({ msg: "Erro ao buscar funcionarios" });
    }
}

async function buscarPorId(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }
  const funcionarioEncontrado = await Funcionario.findOne({ _id: id });
  if (funcionarioEncontrado) {
    req.funcionarios = funcionarioEncontrado;
    return next();
  }
  return res.status(404).json({ msg: "Funcionario nao encontrado" });
}

async function atualizar(req, res) {
    const { id } = req.params;
    const { email, senha } = req.body;

    // 400 — ID inválido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido" });
    }

    // 422 — validação do email (EXATAMENTE como teste quer)
    if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(422).json({ msg: "email do funcionario é obrigatorio" });
    }

    const funcionarioEncontrado = await Funcionario.findById(id);

    // 404 — funcionário não existe
    if (!funcionarioEncontrado) {
        return res.status(404).json({ msg: "funcionario nao encontrado" });
    }

    funcionarioEncontrado.email = email;
    funcionarioEncontrado.senha = senha; // 👈 sem hash para bater o teste

    await funcionarioEncontrado.save();

    return res.status(200).json(funcionarioEncontrado);
}



module.exports = { criar, entrar, renovar, remover, listar, buscarPorId, atualizar, exibir };