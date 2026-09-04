let pacientes = [
    {
        id: 1,
        nombre: "Juan Pérez",
        edad: 40,
        ciudad: "Monteria",
        activo: true
    },
    {
        id: 2,
        nombre: "Ana Torres",
        edad: 25,
        ciudad: "Medellín",
        activo: false
    },
    {
        id: 3,
        nombre: "Carlos Ruíz",
        edad: 60,
        ciudad: "Montería",
        activo: true
    },
    {
        id: 4,
        nombre: "Luisa Gómez",
        edad: 18,
        ciudad: "Bogotá",
        activo: true
    }
];

//Cargar Pacientes al iniciar la aplicacion

const pacientesGuardados = localStorage.getItem("pacientes");

if(pacientesGuardados) {
    pacientes = JSON.parse(pacientesGuardados);
}

//LocalStorage

const guardarPacientes = () => {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

//Funcion para actualizar indicadores 

const actualizarIndicadores = () => {

    const totalPacientes = pacientes.length;

    const pacientesActivos = pacientes.filter(
        paciente => paciente.activo
    ).length;

    const pacientesInactivos = pacientes.filter(
        paciente => !paciente.activo
    ).length;

    const totalEdades = pacientes.reduce((acc, paciente) => {
        return acc + paciente.edad;
    }, 0);

    const edadPromedio = totalEdades / pacientes.length;

    const indicadores = [
        {
            titulo: "Total pacientes",
            valor: totalPacientes
        },
        {
            titulo: "Activos",
            valor: pacientesActivos
        },
        {
            titulo: "Inactivos",
            valor: pacientesInactivos
        },
        {
            titulo: "Edad Promedio",
            valor: edadPromedio.toFixed(2)
        }
    ];

    const contenedor = document.getElementById("cards");

    const html = indicadores
        .map(indicador => `
            <div class = "card">
                <h3>${indicador.titulo}</h3>
                <p>${indicador.valor}</p>
            </div>
    `)
        .join("");

    contenedor.innerHTML = html;
};

//Tabla de pacientes

const contenedorTabla = document.getElementById("tablaPacientes");

contenedorTabla.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-editar")) {

        const id = parseInt(e.target.dataset.id);
        const paciente = pacientes.find(paciente => paciente.id === id);

        pacienteEditandoId = id;

        nombreInput.value = paciente.nombre;
        edadInput.value = paciente.edad;
        ciudadInput.value = paciente.ciudad;
        activoInput.checked = paciente.activo;

        btnGuardar.textContent = "Actualizar paciente";
    
    }

    if (e.target.classList.contains("btn-eliminar")) {

        const id = parseInt(e.target.dataset.id);

        const paciente = pacientes.find(
          paciente => paciente.id === id
        );
        if (!paciente) {
            return;
        }

        const confirmar = confirm(
            `¿Seguro que deseas eliminar a ${paciente.nombre}?`
        );

        if (!confirmar) {
            return;
        };

        pacientes = pacientes.filter(paciente => paciente.id !== id);

        renderizarTabla(pacientes);
        actualizarIndicadores();
        guardarPacientes();
    }

});

const renderizarTabla = (listaPacientes) => {
    const htmlPacientes = listaPacientes
        .map(paciente => `
            <tr>
                <td>${paciente.nombre}</td>
                <td>${paciente.edad}</td>
                <td>${paciente.ciudad}</td>
                <td>${paciente.activo
                ? `<span class = "badge badge-activo">Activo</span>`
                : `<span class = "badge badge-inactivo">Inactivo</span>`}</td>
                <td>
                    <button class="btn-editar" data-id = "${paciente.id}">
                        Editar
                    </button>
                    <button class="btn-eliminar" data-id = "${paciente.id}">
                        Eliminar
                    </button>
                </td>
            </tr>
        `)
        .join("");

    contenedorTabla.innerHTML = htmlPacientes;
};

//Buscador

const buscador = document.getElementById("buscarPaciente");

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const resultados = pacientes.filter(paciente => {
        return paciente.nombre.toLowerCase().includes(texto)
    });

    renderizarTabla(resultados);
});


//Filtro de Botones 

const btnTodos = document.getElementById("btnTodos")
const btnActivos = document.getElementById("btnActivos");
const btnInactivos = document.getElementById("btnInactivos");
let filtroEstado = "todos";

const limpiarBotones = () => {

    btnTodos.classList.remove("activo");
    btnActivos.classList.remove("activo");
    btnInactivos.classList.remove("activo");
};


//Boton todos
btnTodos.addEventListener("click", () => {
    limpiarBotones();
    filtroEstado = "todos"
    btnTodos.classList.add("activo");
    actualizarVista();
});

//Boton activos
btnActivos.addEventListener("click", () => {

    limpiarBotones();
    btnActivos.classList.add("activo")
    filtroEstado = "activos";
    actualizarVista();
    
});

//Boton Inactivos
btnInactivos.addEventListener("click", () => {

    limpiarBotones();
    btnInactivos.classList.add("activo");
    filtroEstado = "inactivos"
    actualizarVista();
});

const actualizarVista = () => {
    
    const texto = buscador.value.toLowerCase();

    let resultados;

    if (filtroEstado === "todos") {

        resultados = pacientes;
    }

    if (filtroEstado === "activos") {

        resultados = pacientes.filter(paciente => paciente.activo);
    }

    if (filtroEstado === "inactivos") {

        resultados = pacientes.filter(paciente => !paciente.activo);
    }

    resultados = resultados.filter(paciente => {
        return paciente.nombre.toLowerCase().includes(texto);
    });

    renderizarTabla(resultados);
}

//Formulario

const formulario = document.getElementById("formPaciente");

const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const ciudadInput = document.getElementById("ciudad");
const activoInput = document.getElementById("activo");
const btnCancelar = document.getElementById("btnCancelar");
const btnGuardar = document.querySelector("#formPaciente button");

let pacienteEditandoId = null;

const cancelarEdicion = () => {

    formulario.reset();

    pacienteEditandoId = null;

    btnGuardar.textContent = "Guardar paciente";
};

btnCancelar.addEventListener("click", () => {

    cancelarEdicion();
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const edad = parseInt(edadInput.value);
    const ciudad = ciudadInput.value.trim();

    if (nombre === "") {
        alert("Nombre no válido")
        return;
    }
    if (edad <= 0) {
        alert("Edad no válida")
        return;
    }
    if (ciudad === "") {
        alert("Ciudad no válida")
        return;
    }

    const nuevoPaciente = {
        id: pacientes.length > 0
            ? Math.max(...pacientes.map(paciente => paciente.id)) + 1
            : 1,

        nombre: nombre,
        edad: edad,
        ciudad: ciudad,
        activo: activoInput.checked
    };

    if (pacienteEditandoId === null) {

        pacientes.push(nuevoPaciente);

    } else {

        console.log("Pacientes:", pacientes);
        console.log("ID editando:", pacienteEditandoId);

        const paciente = pacientes.find(
            paciente => Number(paciente.id) === Number(pacienteEditandoId)
        );

        console.log("Paciente encontrado:", paciente);

        paciente.nombre = nombre;
        paciente.edad = edad;
        paciente.ciudad = ciudad;
        paciente.activo = activoInput.checked;
    }

    renderizarTabla(pacientes);
    actualizarIndicadores();
    formulario.reset();
    pacienteEditandoId = null;
    guardarPacientes();
});

//Carga Inicial

renderizarTabla(pacientes);
actualizarIndicadores();

