const readline = require('readline-sync');
const conectar = require('./conexion');
const paciente = require('./pacientes');
const especialista = require('./especialista');
const cita = require('./cita');

async function main() {
    await conectar();
    const rol = readline.question('Eres administrador (a) o administrativo (i)?: ');
    let opcion = 0;
    do {
        console.log('1. Crear paciente');
        console.log('2. Crear especialista');
        console.log('3. Crear cita');
        console.log('4. Mostrar pacientes');
        console.log('5. Mostrar especialistas');
        console.log('6. Mostrar citas');
        console.log('7. Ver historial de un paciente');
        console.log('8. Ver citas por día');
        console.log('9. Ver pacientes por estado en un rango de fechas');
        console.log('10. Salir');
        opcion=readline.questionInt('Seleccione una opcion:');

        if (rol === 'a' && opcion !== 2 && opcion !== 10) {
            console.log('Solo puedes acceder a la opción 2 (crear especialista).');
            continue;
        }
        if (rol === 'i' && opcion === 2) {
            console.log('No tienes permiso para crear especialistas.');
            continue;
        }

        switch(opcion){
            case 1:
                let nombre=readline.question('Por favor ingrese el nombre del nuevo paciente: ');
                let apellido=readline.question('Por favor ingrese el apellido del nuevo paciente: ');
                let dni=readline.question('Por favor ingrese el dni del nuevo paciente: ');
                let fechaNacimiento=readline.question('Por favor ingrese la fecha de nacimiento del nuevo paciente: ');
                let nuevoPaciente=new paciente({
                    nombre:nombre,
                    apellido:apellido,
                    dni:dni,
                    fechaNacimiento:fechaNacimiento
                });
                await nuevoPaciente.save();
                console.log('Paciente creado con éxito');
                break;
            case 2:
                let nombreEspecialista=readline.question('Por favor ingrese el nombre del nuevo especialista: ');
                let apellidoEspecialista=readline.question('Por favor ingrese el apellido del nuevo especialista: ');
                let dniEspecialista=readline.question('Por favor ingrese el dni del nuevo especialista: ');
                let fechaNacimientoEspecialista=readline.question('Por favor ingrese la fecha de nacimiento del nuevo especialista: ');
                let nuevoEspecialista=new especialista({
                    nombre:nombreEspecialista,
                    apellido:apellidoEspecialista,
                    dni:dniEspecialista,
                    fechaNacimiento:fechaNacimientoEspecialista
                });
                await nuevoEspecialista.save();
                console.log('Especialista creado con éxito');
                break;
            case 3:
                let idPaciente=readline.question('Por favor ingrese el id del paciente: ');
                let idEspecialista=readline.question('Por favor ingrese el id del especialista: ');
                let fecha=readline.question('Por favor ingrese la fecha de la cita: ');
                let hora=readline.question('Por favor ingrese la hora de la cita: ');
                let estado=readline.question('Por favor ingrese el estado de la cita: ');
                let nuevaCita=new cita({
                    paciente:idPaciente,
                    especialista:idEspecialista,
                    fecha:fecha,
                    hora:hora,
                    estado:estado
                })
                await nuevaCita.save();
                console.log('Cita creada con éxito');
                break;
            case 4:
                let pacientes=await paciente.find();
                console.log('Pacientes: ');
                console.log(pacientes);
                break;
            case 5:
                let especialistas=await especialista.find();
                console.log('Especialistas: ');
                console.log(especialistas);
                break;
            case 6:
                let citas=await cita.find().populate('paciente').populate('especialista');
                console.log('Citas: ');
                console.log(citas);
                break;
            case 7:
                let dniHistorial = readline.question('Introduce el DNI del paciente: ');
                let pacienteHist = await paciente.findOne({ dni: dniHistorial });
                if (!pacienteHist) {
                    console.log('Paciente no encontrado.');
                    break;
                }
                let historial = await cita.find({ paciente: pacienteHist._id }).populate('especialista');
                console.log('Historial de citas:');
                console.log(historial);
                break;
            case 8:
                let dia = readline.question('Introduce la fecha exacta (ej: 2025-04-21): ');
                let citasDelDia = await cita.find({ fecha: dia }).populate('paciente').populate('especialista');
                console.log('Citas del día:');
                console.log(citasDelDia);
                break;
            case 9:
                let fechaInicio = readline.question('Fecha inicio (ej: 2025-04-20): ');
                let fechaFin = readline.question('Fecha fin (ej: 2025-04-23): ');
                let estadoCita = readline.question('¿Buscar "asiste" o "no asiste"?: ');
                let citasRango = await cita.find({
                    fecha: { $gte: fechaInicio, $lte: fechaFin },
                    estado: estadoCita
                }).populate('paciente').populate('especialista');
                console.log(`Citas con estado ${estadoCita}:`);
                console.log(citasRango);
                break;
            case 10:
                console.log('Saliendo...');
                break;
            
            default:
                console.log('Opción no válida');
                break;
        }

    }while(opcion!=10);
    console.log('Fin del programa');
    process.exit(0);
}
main();
