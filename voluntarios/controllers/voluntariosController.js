const mongoose = require("mongoose")
const { criarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddlewares');
const Voluntario = require('../models/voluntariosModel.js');

async function listar(req, res) {
  try {
    const voluntarios = await Voluntario.find({});
    return res.json(voluntarios);
  } catch (err) {
    res.status(500).json({ msg: "Problema de conexão com o servidor" });
  }
}

async function criar(req,res){
    try{
        const senhaCriada = criarSenha(req.body.senha);
        const novoVoluntario = await Voluntario.create({
            email: req.body.email,
            senha: senhaCriada
        });
        return res.status(201).json(novoVoluntario);
    }catch(err){
        return res.status(422).json({msg:'Email e Senha são obrigatórios'});
    }
}

async function buscar(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }

  const voluntarioEncontrado = await Voluntario.findOne({ _id: id });
  if (voluntarioEncontrado) {
    req.voluntarios = voluntarioEncontrado;
    return next();
  }
  return res.status(404).json({ msg: "Voluntário não encontrado" });
}

async function entrar(req,res){
    const voluntarioEncontrado = await Voluntario.findOne({email:req.body.email});
    if(voluntarioEncontrado){
        const confere = compararSenha(req.body.senha,voluntarioEncontrado.senha);
        if(confere){
            const token = gerarToken({email:req.body.email});
            return res.status(200).json({token: token});
        }else{
            return res.status(401).json({msg:'Credenciais inválidas'})
        }
    }else{
        return res.status(401).json({msg:'Credenciais inválidas'})
    }
}

async function renovar(req, res) {
    const novoToken = gerarToken({ email: req.usuario.email });
    return res.status(200).json({ token: novoToken });
}

function exibir(req, res) {
  return res.json(req.voluntarios);
}

async function atualizar(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "ID inválido" });
  }
  const { email, senha } = req.body;
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(422).json({ msg: "email do voluntário é obrigatorio" });
  }
  if (!senha || typeof senha !== "string" || senha.trim() === "") {
    return res.status(422).json({ msg: "senha do voluntário é obrigatorio" });
  }
  const voluntario = await Voluntario.findById(id);
  if (!voluntario) {
    return res.status(404).json({ msg: "Voluntário não encontrado" });
  }

  voluntario.email = email;
  voluntario.senha = senha;
  await voluntario.save();

  return res.status(200).json(voluntario);
}

async function remover(req,res){
    const { id } = req.params;
    const voluntarioEncontrado = await Voluntario.findOneAndDelete({_id:id});
    return res.status(204).json({});
}

module.exports = { listar, criar, buscar, entrar, renovar, exibir, atualizar, remover };