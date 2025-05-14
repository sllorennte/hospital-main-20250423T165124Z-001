document.getElementById('crearEspecialistaForm').addEventListener('submit', async function (e) {
    e.preventDefault();  // Prevenir el envío tradicional del formulario

    // Recoger los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const dni = document.getElementById('dni').value;
    const especialidad = document.getElementById('especialidad').value;

    // Crear un objeto con los datos a enviar
    const especialistaData = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        especialidad: especialidad
    };

    try {
        // Enviar los datos al servidor usando fetch
        const response = await fetch('http://localhost:3000/api/especialistas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(especialistaData)  // Convertimos los datos a JSON
        });

        if (response.ok) {
            const data = await response.json();
            alert('Especialista creado con éxito');
        } else {
            alert('Error al crear especialista');
        }
    } catch (error) {
        alert('Error de conexión');
    }
});
