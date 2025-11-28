const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  data: { type: Date, required: true },
  local: { type: String, required: false, trim: true },
  descricao: { type: String, default: "" },
  limite_voluntarios: { type: Number, required: false, min: 1 },
  voluntarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }] 
});

module.exports = mongoose.model("Evento", eventoSchema);
