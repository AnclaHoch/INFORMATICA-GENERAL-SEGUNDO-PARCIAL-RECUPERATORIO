//Array donde vamos a guardar cada instalación cargada (array de objetos)
let instalaciones = [];

//Variables generales del estudio (se completan una sola vez)
let cantidadInstalaciones;
let horasPorDia;
let valorHora;

//Contador de instalaciones que ya se cargaron
let contador = 0;

//Capturamos del DOM los elementos del Formulario 1
const inputCantidadInstalaciones = document.querySelector("#cantidadInstalaciones");
const inputHorasPorDia = document.querySelector("#horasPorDia");
const inputValorHora = document.querySelector("#valorHora");
const btnConfirmarDatos = document.querySelector("#btnConfirmarDatos");

//Capturamos del DOM los elementos del Formulario 2
const inputNombreInstalacion = document.querySelector("#nombreInstalacion");
const inputPersonasInstalacion = document.querySelector("#personasInstalacion");
const inputDiasInstalacion = document.querySelector("#diasInstalacion");
const btnAgregarInstalacion = document.querySelector("#btnAgregarInstalacion");

//Capturamos los demás elementos
const contadorTexto = document.querySelector("#contador");
const btnCalcular = document.querySelector("#btnCalcular");
const divResultados = document.querySelector("#resultados");
const btnReiniciar = document.querySelector("#btnReiniciar");

//Evento: click en "Confirmar datos generales"
btnConfirmarDatos.addEventListener("click", function () {

    cantidadInstalaciones = Number(inputCantidadInstalaciones.value);
    horasPorDia = Number(inputHorasPorDia.value);
    valorHora = Number(inputValorHora.value);

    btnConfirmarDatos(cantidadInstalaciones, horasPorDia, valorHora);

});

btnConfirmarDatos.addEventListener("click", function () {

    cantidadInstalaciones = Number(inputCantidadInstalaciones.value);
    horasPorDia = Number(inputHorasPorDia.value);
    valorHora = Number(inputValorHora.value);

    //Validación: los 3 datos tienen que ser números mayores a 0
    if (isNaN(cantidadInstalaciones) || isNaN(horasPorDia) || isNaN(valorHora) || cantidadInstalaciones <= 0 || horasPorDia <= 0 || valorHora <= 0) {
        alert("Completá los 3 campos con números mayores a 0.");
        return;
    }

    //Deshabilitamos el Formulario 1, ya se cargó
    inputCantidadInstalaciones.disabled = true;
    inputHorasPorDia.disabled = true;
    inputValorHora.disabled = true;
    btnConfirmarDatos.disabled = true;

    //Habilitamos el Formulario 2, para empezar a cargar instalaciones
    inputNombreInstalacion.disabled = false;
    inputPersonasInstalacion.disabled = false;
    inputDiasInstalacion.disabled = false;
    btnAgregarInstalacion.disabled = false;

    //Mostramos cuántas instalaciones van cargadas
    contadorTexto.innerText = "Instalaciones cargadas: " + contador + " de " + cantidadInstalaciones;

});