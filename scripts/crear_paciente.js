// Usar jQuery para asegurarte de que el DOM esté listo
$(document).ready(function() {
    $('#crearPacienteForm').on('submit', async function(e) {
        e.preventDefault();  // Prevenir el envío tradicional del formulario

        // Recoger los valores de los campos
        const nombre = $('#nombre').val();
        const apellido = $('#apellido').val();
        const dni = $('#dni').val();
        const fechaNacimiento = $('#fechaNacimiento').val();

        // Crear un objeto con los datos a enviar
        const pacienteData = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaNacimiento: fechaNacimiento
        };

        try {
            // Enviar los datos al servidor usando fetch
            const response = await fetch('http://localhost:3000/api/pacientes/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pacienteData)  // Convertimos los datos a JSON
            });

            if (response.ok) {
                const data = await response.json();
                alert('Paciente creado con éxito');
            } else {
                alert('Error al crear paciente');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    });
});
