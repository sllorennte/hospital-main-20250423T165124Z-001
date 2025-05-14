document.getElementById('crearCitaForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevenir el envío tradicional del formulario

    // Recoger los valores de los campos
    const idPaciente = document.getElementById('idPaciente').value;
    const idEspecialista = document.getElementById('idEspecialista').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const estado = document.getElementById('estado').value;

    // Crear un objeto con los datos a enviar
    const citaData = {
        paciente: idPaciente,
        especialista: idEspecialista,
        fecha: fecha,
        hora: hora,
        estado: estado
    };

    try {
        // Enviar los datos al servidor usando fetch
        const response = await fetch('http://localhost:3000/api/citas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(citaData)  // Convertimos los datos a JSON
        });

        if (response.ok) {
            const data = await response.json();
            alert('Cita creada con éxito');
        } else {
            alert('Error al crear cita');
        }
    } catch (error) {
        alert('Error de conexión');
    }
});
