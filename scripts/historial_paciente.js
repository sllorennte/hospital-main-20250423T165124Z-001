document.getElementById('mostrarHistorial').addEventListener('click', async function () {
    const dni = document.getElementById('dniPaciente').value;

    try {
        const response = await fetch(`http://localhost:3000/api/pacientes/${dni}/historial`);

        if (response.ok) {
            const historial = await response.json();
            document.getElementById('resultadoHistorial').textContent = JSON.stringify(historial, null, 2);
        } else {
            alert('Paciente no encontrado');
        }
    } catch (error) {
        alert('Error de conexión');
    }
});
