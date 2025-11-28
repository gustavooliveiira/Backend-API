const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  presenca: {
    type: Boolean,
  },
  data: {
    type: String,
    default: new Date().toLocaleDateString("pt-BR"),
  },
});

module.exports = mongoose.model("Presenca", schema);
