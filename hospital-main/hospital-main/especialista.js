const mongoose = require('mongoose');
const especialista = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: String,
    especialidad: String,
});
module.exports = mongoose.model('especialista', especialista);