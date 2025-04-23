const mongoose = require('mongoose');
const cita = new mongoose.Schema({
    paciente:{type: mongoose.Schema.Types.ObjectId, ref: 'paciente'},
    especialista:{type: mongoose.Schema.Types.ObjectId, ref: 'especialista'},
    fecha: String,
    hora: String,
    estado: String,
});
module.exports = mongoose.model('cita', cita);