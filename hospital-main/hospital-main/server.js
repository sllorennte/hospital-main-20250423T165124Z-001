const express = require('express');
const conectar = require('./conexion'); 
const Paciente = require('./pacientes'); 
const Especialista = require('./especialista'); 
const Cita = require('./cita');

const app = express();
const PORT = 3000;

// Middleware para permitir que el servidor reciba datos JSON
app.use(express.json());

// Rutas para crear, mostrar y gestionar los pacientes, especialistas y citas

// Crear paciente
app.post('/api/pacientes/crear', async (req, res) => {
    try {
        const nuevoPaciente = new Paciente(req.body);
        await nuevoPaciente.save();
        res.status(201).send('Paciente creado con éxito');
    } catch (error) {
        res.status(400).send('Error al crear paciente: ' + error.message);
    }
});

// Mostrar pacientes
app.get('/api/pacientes', async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(400).send('Error al obtener pacientes: ' + error.message);
    }
});

// Crear especialista
app.post('/api/especialistas/crear', async (req, res) => {
    try {
        const nuevoEspecialista = new Especialista(req.body);
        await nuevoEspecialista.save();
        res.status(201).send('Especialista creado con éxito');
    } catch (error) {
        res.status(400).send('Error al crear especialista: ' + error.message);
    }
});

// Crear cita
app.post('/api/citas/crear', async (req, res) => {
    try {
        const nuevaCita = new Cita(req.body);
        await nuevaCita.save();
        res.status(201).send('Cita creada con éxito');
    } catch (error) {
        res.status(400).send('Error al crear cita: ' + error.message);
    }
});

// Mostrar citas
app.get('/api/citas', async (req, res) => {
    try {
        const citas = await Cita.find().populate('paciente').populate('especialista');
        res.status(200).json(citas);
    } catch (error) {
        res.status(400).send('Error al obtener citas: ' + error.message);
    }
});

// Ver historial de un paciente
app.get('/api/pacientes/:dni/historial', async (req, res) => {
    const { dni } = req.params;
    try {
        const paciente = await Paciente.findOne({ dni });
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }
        const historial = await Cita.find({ paciente: paciente._id }).populate('especialista');
        res.status(200).json(historial);
    } catch (error) {
        res.status(400).send('Error al obtener historial: ' + error.message);
    }
});

// Ver citas por día
app.get('/api/citas/dia', async (req, res) => {
    const { fecha } = req.query;
    try {
        const citasDelDia = await Cita.find({ fecha }).populate('paciente').populate('especialista');
        res.status(200).json(citasDelDia);
    } catch (error) {
        res.status(400).send('Error al obtener citas por día: ' + error.message);
    }
});

// Ver pacientes por estado en un rango de fechas
app.get('/api/pacientes/rango', async (req, res) => {
    const { fechaInicio, fechaFin, estado } = req.query;
    try {
        const citas = await Cita.find({
            fecha: { $gte: fechaInicio, $lte: fechaFin },
            estado: estado
        }).populate('paciente').populate('especialista');
        res.status(200).json(citas);
    } catch (error) {
        res.status(400).send('Error al obtener citas por estado en rango: ' + error.message);
    }
});

// Inicia el servidor
app.listen(PORT, async () => {
    await conectar(); // Llama a la función de conexión a MongoDB
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
