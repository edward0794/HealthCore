const pacientes = [
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

const contenerdorTabla = document.getElementById("tablaPacientes");

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
            </tr>
        `)
        .join("");

    contenerdorTabla.innerHTML = htmlPacientes;
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


const limpiarBotones = () => {

    btnTodos.classList.remove("activo");
    btnActivos.classList.remove("activo");
    btnInactivos.classList.remove("activo");
};

//Boton todos

btnTodos.addEventListener("click", () => {
    limpiarBotones()
    btnTodos.classList.add("activo")
    renderizarTabla(pacientes);
});

//Boton activos

btnActivos.addEventListener("click", () => {
    limpiarBotones();
    btnActivos.classList.add("activo")

    const activos = pacientes.filter(paciente => {
        return paciente.activo;
    });

    renderizarTabla(activos);
});

//Boton Inactivos

btnInactivos.addEventListener("click", () => {
    limpiarBotones();
    btnInactivos.classList.add("activo");

    const inactivos = pacientes.filter(paciente => {
        return !paciente.activo;
    });

    renderizarTabla(inactivos);
});

//Formulario

const formulario = document.getElementById("formPaciente");

const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const ciudadInput = document.getElementById("ciudad");
const activoInput = document.getElementById("activo");

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
        id: pacientes.length + 1,
        nombre: nombre,
        edad: edad,
        ciudad: ciudad,
        activo: activoInput.checked
    };

    pacientes.push(nuevoPaciente);
    renderizarTabla(pacientes);
    actualizarIndicadores();
    formulario.reset();
    
});

//Carga Inicial

renderizarTabla(pacientes);
actualizarIndicadores();
