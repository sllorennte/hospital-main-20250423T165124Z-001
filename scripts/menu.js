const rol = new URLSearchParams(window.location.search).get('rol');
const opciones = document.getElementById('opciones');

const botonesAdmin = [
    ['Crear especialista', 'crear_especialista.html']
];

const botonesAdmini = [
    ['Crear paciente', 'crear_paciente.html'],
    ['Crear cita', 'crear_cita.html'],
    ['Mostrar pacientes', 'mostrar.html'],
    ['Mostrar especialistas', 'mostrar.html'],
    ['Mostrar citas', 'mostrar.html'],
    ['Ver historial de un paciente', 'historial_paciente.html'],
    ['Ver citas por día', 'citas_dia.html'],
    ['Ver pacientes en rango de fechas', 'citas_rango.html']
];

const comunes = [['Salir', 'index.html', 'boton-rojo']];

const mostrarBotones = (botones) => {
    botones.forEach(([texto, link, claseExtra]) => {
        const btn = document.createElement('a');
        btn.href = link;
        btn.textContent = texto;
        btn.className = 'boton-gris ' + (claseExtra || '');
        opciones.appendChild(btn);
    });
};

if (rol === 'admin') mostrarBotones(botonesAdmin.concat(comunes));
else mostrarBotones(botonesAdmini.concat(comunes));
