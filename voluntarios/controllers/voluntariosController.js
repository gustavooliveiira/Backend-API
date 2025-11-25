const { criarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddlewares');
const voluntariosModel = require('../models/voluntariosModel.js');

async function criar(req,res){
    try{
        const senhaCriada = criarSenha(req.body.senha);
        const novoVoluntario = await voluntariosModel.create({
            email: req.body.email,
            senha: senhaCriada
        });
        return res.status(201).json(novoVoluntario);
    }catch(err){
        return res.status(422).json({msg:'Email e Senha são obrigatórios'});
    }
}

async function entrar(req,res){
    const voluntarioEncontrado = await voluntariosModel.findOne({email:req.body.voluntarios});
    if(voluntarioEncontrado){
        const confere = compararSenha(req.body.senha,voluntarioEncontrado.senha);
        if(confere){
            const token = gerarToken({email:req.body.voluntarios});
            return res.status(200).json({token: token});
        }else{
            return res.status(401).json({msg:'Credenciais inválidas'})
        }
    }else{
        return res.status(401).json({msg:'Credenciais inválidas'})
    }
}

async function renovar(req,res){
    const token = gerarToken({email:req.voluntarios});
    return res.status(200).json({token: token});
}

async function remover(req,res){
    const { id } = req.params;
    const voluntarioEncontrado = await voluntariosModel.findOneAndDelete({_id:id});
    return res.status(204).json({});
}

module.exports = { criar, entrar, renovar, remover };