const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function verificarToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token) {
      const tokenPuro = token.split(" ")[1];
      req.usuario = jwt.verify(tokenPuro, process.env.JWT_SECRET);
      return next();
    } else {
      return res.status(401).json({ msg: "Token inválido" });
    }
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  try {
    const expiresIn = process.env.JWT_EXPIRES;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return { token };
  } catch (err) {
    throw Error("Erro ao gerar token");
  }
}

module.exports = { verificarToken, gerarToken };
