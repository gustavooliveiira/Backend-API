const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
      },
    senha: {
        type: String,
      },
})

module.exports = mongoose.model('Voluntario',schema)