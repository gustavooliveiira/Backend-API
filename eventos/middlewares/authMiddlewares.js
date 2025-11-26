const jwt = require('jsonwebtoken');

// Verifica o token nas rotas protegidas
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

// Gera token com expiração baseada no .env
function gerarToken(payload){
    try{
        const expiresIn = process.env.JWT_EXPIRES;
        const token = jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn });
        return token;
    }catch(err){
        throw Error("Erro ao gerar token");
    }
}

// Apenas converte a data da requisição em Date
function criarData(dataStr){
    const [dia, mes, ano] = dataStr.split("/");
    return new Date(`${ano}-${mes}-${dia}`);
}

// Compara data do login com a do evento
function compararData(dataDigitada, dataEvento){
    const dia   = String(dataEvento.getUTCDate()).padStart(2,"0");
    const mes   = String(dataEvento.getUTCMonth()+1).padStart(2,"0");
    const ano   = dataEvento.getUTCFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada === dataDigitada;
}

module.exports = { verificarToken, gerarToken, criarData, compararData };
