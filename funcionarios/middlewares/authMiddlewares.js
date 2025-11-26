const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function verificarToken(req,res,next){
    try{
        const token = req.headers.authorization;
        if(token){
            const tokenPuro = token.split(" ")[1];
            req.usuario = jwt.verify(tokenPuro,process.env.JWT_SECRET)
            return next();
        }else{
            return res.status(401).json({msg:'Token inválido'});
        }
    }catch(err){
        return res.status(401).json({msg:'Token inválido'});
    }
}

function gerarToken(payload){
    try{
        const expiresIn = process.env.JWT_EXPIRES;
        const token =  jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn });
        return token;
    }catch(err){
        throw Error("Erro ao gerar token");
    }
}

function criarSenha(senha){
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha,salto);
    return hash;
}

function compararSenha(senha,hash){
    return bcrypt.compareSync(senha,hash);
}

module.exports = { verificarToken, gerarToken, criarSenha, compararSenha};