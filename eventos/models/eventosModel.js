const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: {
        type: String,
      },
    data: {
        type: Date,
        default: Date.now
      },
})

module.exports = mongoose.model('Evento',schema)