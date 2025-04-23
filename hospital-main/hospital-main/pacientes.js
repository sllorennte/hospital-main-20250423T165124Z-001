const mongoose = require('mongoose');
const paciente = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: String,
    fechaNacimiento: String,
});

module.exports = mongoose.model('paciente', paciente);