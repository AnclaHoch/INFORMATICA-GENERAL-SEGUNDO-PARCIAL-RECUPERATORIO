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

btnAgregarInstalacion.addEventListener("click", function () {

    let nombre = inputNombreInstalacion.value;
    let personas = Number(inputPersonasInstalacion.value);
    let dias = Number(inputDiasInstalacion.value);

    //Validación de los datos de la instalación
    if (nombre === "" || isNaN(personas) || isNaN(dias) || personas <= 0 || dias <= 0) {
        alert("Completá el nombre, la cantidad de personas y los días con datos válidos.");
        return;
    }

    //Armamos el objeto de la instalación
    let instalacion = {
        nombre: nombre,
        personas: personas,
        dias: dias
    };

    //Lo agregamos al array
    instalaciones.push(instalacion);

    //Sumamos 1 al contador 
    contador = contador + 1;

    //Actualizamos el texto en pantalla
    contadorTexto.innerText = "Instalaciones cargadas: " + contador + " de " + cantidadInstalaciones;

    //Limpiamos los campos para cargar la próxima instalación
    inputNombreInstalacion.value = "";
    inputPersonasInstalacion.value = "";
    inputDiasInstalacion.value = "";

    //Si ya se cargó la cantidad de instalaciones pedida...
    if (contador === cantidadInstalaciones) {

        //Deshabilitamos el Formulario 2
        inputNombreInstalacion.disabled = true;
        inputPersonasInstalacion.disabled = true;
        inputDiasInstalacion.disabled = true;
        btnAgregarInstalacion.disabled = true;

        //Habilitamos el botón de Calcular
        btnCalcular.disabled = false;
    }

});

btnCalcular.addEventListener("click", function () {

    let sumaPersonas = 0;
    let costoTotalEstudio = 0;

    //Usamos la primera instalación como referencia inicial del máximo
    let instalacionMax = instalaciones[0];

    for (let i = 0; i < instalaciones.length; i++) {

        //Acumulador: sumamos las personas de todas las instalaciones
        sumaPersonas = sumaPersonas + instalaciones[i].personas;

        //Costo total de esta instalación puntual
        let costoInstalacion = instalaciones[i].personas * instalaciones[i].dias * horasPorDia * valorHora;

        //Acumulador: sumamos al costo total del estudio
        costoTotalEstudio = costoTotalEstudio + costoInstalacion;

        //Patrón de búsqueda de máximo: comparamos cada instalación con la máxima actual
        if (instalaciones[i].dias > instalacionMax.dias) {
            instalacionMax = instalaciones[i];
        }

    }

    //Costo de un día de trabajo de todo el estudio junto
    let costoUnDia = sumaPersonas * horasPorDia * valorHora;

    //Costo total de la instalación con más días
    let costoInstalacionMax = instalacionMax.personas * instalacionMax.dias * horasPorDia * valorHora;

    //Porcentaje que representa esa instalación sobre el costo total del estudio
    let porcentaje = (costoInstalacionMax / costoTotalEstudio) * 100;

    //Mostramos los resultados en pantalla
    divResultados.innerHTML = "<p>Costo de un día de trabajo del estudio: $" + costoUnDia + "</p>" +
        "<p>Instalación con más días de producción: " + instalacionMax.nombre + " (" + instalacionMax.dias + " días)</p>" +
        "<p>Costo total de esa instalación: $" + costoInstalacionMax + "</p>" +
        "<p>Porcentaje sobre el costo total del estudio: " + Math.round(porcentaje) + "%</p>";

    //Deshabilitamos Calcular y habilitamos Reiniciar
    btnCalcular.disabled = true;
    btnReiniciar.disabled = false;

});

btnReiniciar.addEventListener("click", function () {

    //Vaciamos el array y reiniciamos el contador
    instalaciones = [];
    contador = 0;

    //Limpiamos todos los campos de los formularios
    inputCantidadInstalaciones.value = "";
    inputHorasPorDia.value = "";
    inputValorHora.value = "";
    inputNombreInstalacion.value = "";
    inputPersonasInstalacion.value = "";
    inputDiasInstalacion.value = "";

    //Limpiamos el contador y los resultados en pantalla
    contadorTexto.innerText = "";
    divResultados.innerHTML = "";

    //Volvemos a habilitar el Formulario 1
    inputCantidadInstalaciones.disabled = false;
    inputHorasPorDia.disabled = false;
    inputValorHora.disabled = false;
    btnConfirmarDatos.disabled = false;

    //Deshabilitamos todo lo demás, como al principio
    inputNombreInstalacion.disabled = true;
    inputPersonasInstalacion.disabled = true;
    inputDiasInstalacion.disabled = true;
    btnAgregarInstalacion.disabled = true;
    btnCalcular.disabled = true;
    btnReiniciar.disabled = true;

});