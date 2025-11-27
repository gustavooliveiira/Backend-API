const jwt = require('jsonwebtoken');

// Verifica token nas rotas protegidas
function verificarToken(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        const tokenPuro = token.split(" ")[1]; // "Bearer <token>"

        if (!tokenPuro) {
            return res.status(401).json({ msg: 'Token inválido' });
        }

        req.usuario = jwt.verify(tokenPuro, process.env.JWT_SECRET);
        return next();

    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
}

// Gera token JWT
function gerarToken(payload) {
    const expiresIn = process.env.JWT_EXPIRES || "1h";

    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    } catch (err) {
        throw new Error("Erro ao gerar token");
    }
}

// Converte datas nos formatos:
// "2025-11-26"  → ISO
// "26/11/2025" → Brasileiro
function criarData(dataStr) {
    // Formato ISO yyyy-mm-dd
    if (dataStr.includes("-")) {
        return new Date(dataStr);
    }

    // Formato brasileiro dd/mm/yyyy
    if (dataStr.includes("/")) {
        const [dia, mes, ano] = dataStr.split("/");
        return new Date(`${ano}-${mes}-${dia}`);
    }

    // Se vier algo inesperado
    return new Date(dataStr);
}

// Compara data endpoint login com banco
function compararData(dataDigitada, dataEvento) {
    const dia = String(dataEvento.getUTCDate()).padStart(2, "0");
    const mes = String(dataEvento.getUTCMonth() + 1).padStart(2, "0");
    const ano = dataEvento.getUTCFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataDigitada === dataFormatada;
}

module.exports = {
    verificarToken,
    gerarToken,
    criarData,
    compararData
};
