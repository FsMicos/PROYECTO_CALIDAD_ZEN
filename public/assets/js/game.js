// Array de palabras y datos para el juego
let palabras = [];
let productosSeleccionados = [];
let sitiosUnicos = [];
let profesionalesUnicos = [];
let tiempoInicio; // Hora de inicio del juego
let tiempoAcumulado = 0; // Tiempo acumulado antes de pausar
let juegoPausado = false; // Estado del juego
let aciertos = 0;
let fallos = 0;
let vacios = 0;

// Elementos del DOM
const solutionButton = document.querySelector('.solution-button'); // Botón Mostrar Solución
const solutionBoard = document.getElementById('solution-board'); // Contenedor de soluciones

// Captura del ID del paciente desde la URL
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('pacienteId');

// Obtener la base del servidor actual
const apiBaseUrl = `${window.location.origin}/api`;


// Redirige al inicio si no se proporciona un ID de paciente
if (!pacienteId) {
    console.error('No se proporcionó el ID del paciente');
    window.location.href = 'inicio.html';
}

// Función para inicializar los datos del juego
async function inicializarJuego() {
    aciertos = 0;
    fallos = 0;
    vacios = 0;

    try {
        tiempoInicio = new Date(); // Registrar el inicio del juego

        // Obtener productos desde la API
        const response = await fetch(`${apiBaseUrl}/productos`);
        const productosAleatorios = await response.json();

        console.log('Productos obtenidos:', productosAleatorios);

        // Procesar los datos obtenidos
        palabras = productosAleatorios.map(producto => producto.nombre);
        productosSeleccionados = productosAleatorios;

        // Generar sitios y profesionales únicos
        sitiosUnicos = [...new Map(productosAleatorios.map(producto => [producto.sitio.id, producto.sitio])).values()];
        profesionalesUnicos = [...new Map(productosAleatorios.map(producto => [producto.profesional.id, producto.profesional])).values()];

        cargarPalabras(); // Cargar palabras en el tablero
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
}

// Función para calcular el tiempo transcurrido
function calcularTiempo() {
    if (juegoPausado) {
        return Math.floor(tiempoAcumulado / 1000);
    } else {
        const tiempoFin = new Date();
        return Math.floor((tiempoFin - tiempoInicio) / 1000);
    }
}

// Funciones para pausar y reanudar el juego
function pausarJuego() {
    juegoPausado = true;
    tiempoAcumulado = new Date() - tiempoInicio;

    const alertOverlay = document.getElementById("paused-overlay");
    alertOverlay.style.display = "flex";
}

function reanudarJuego() {
    juegoPausado = false;
    tiempoInicio = new Date() - tiempoAcumulado;
    tiempoInicio = new Date(tiempoInicio);

    const alertOverlay = document.getElementById("paused-overlay");
    alertOverlay.style.display = "none";
}

// Función para registrar un intento en la base de datos
async function registrarIntento(tiempo) {
    try {
        const response = await fetch(`${apiBaseUrl}/intentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_paciente: pacienteId,
                tiempo: tiempo,
                aciertos: aciertos,
                fallos: fallos,
                vacios: vacios,
            }),
        });

        if (response.ok) {
            const intento = await response.json();
            console.log('Intento registrado:', intento);
        } else {
            const error = await response.json();
            console.error('Error al registrar intento:', error);
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
    }
}

// Finaliza el juego y registra el intento
function finalizarJuego() {
    const tiempo = calcularTiempo();
    console.log(`Aciertos: ${aciertos}, Fallos: ${fallos}, Vacíos: ${vacios}`);
    registrarIntento(tiempo);
}

// Crear una fila para un producto
function crearFila(producto) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Imagen del producto
    const img = document.createElement("img");
    img.src = producto.ruta_imagen_producto;
    img.alt = "Imagen del producto";
    img.classList.add("row-image");

    // Eventos de zoom
    img.addEventListener('mouseover', () => {
        img.style.transform = "scale(1.25)";
        img.style.transition = "transform 0.3s ease";
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = "scale(1)";
    });

    // Palabra asociada al producto
    const word = document.createElement("span");
    word.classList.add("word");
    word.textContent = producto.nombre || "Sin nombre";

    // Selects para sitios y profesionales
    const selectSitio = document.createElement("select");
    selectSitio.classList.add("select-sitio-option");
    agregarOpcionesSelect(selectSitio, sitiosUnicos, "Selecciona un sitio");

    const selectProfesional = document.createElement("select");
    selectProfesional.classList.add("select-profesional-option");
    agregarOpcionesSelect(selectProfesional, profesionalesUnicos, "Selecciona un profesional");

    // Agregar elementos a la fila
    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(selectSitio);
    row.appendChild(selectProfesional);

    return row;
}

// Mezcla un array aleatoriamente
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Agrega opciones al select
function agregarOpcionesSelect(select, items, defaultText) {
    mezclarArray(items);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    select.appendChild(defaultOption);

    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.nombre.toLowerCase().replace(/\s+/g, '-');
        option.textContent = item.nombre;
        select.appendChild(option);
    });
}

// Carga palabras en el tablero
function cargarPalabras() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";

    productosSeleccionados.forEach((producto, index) => {
        const fila = crearFila(producto);
        gameBoard.appendChild(fila);
    });
}

// Función para validar el juego
function validarJuego() {
    aciertos = 0;
    fallos = 0;
    vacios = 0;

    const filas = document.querySelectorAll(".row");

    filas.forEach(fila => {
        const selectSitio = fila.querySelector(".select-sitio-option");
        const selectProfesional = fila.querySelector(".select-profesional-option");

        const sitioSeleccionado = selectSitio ? selectSitio.value : null;
        const profesionalSeleccionado = selectProfesional ? selectProfesional.value : null;

        const wordElement = fila.querySelector(".word");
        const productoNombre = wordElement.textContent.toLowerCase().replace(/\s+/g, '-');
        const producto = productosSeleccionados.find(
            producto => producto.nombre.toLowerCase().replace(/\s+/g, '-') === productoNombre
        );

        if (producto) {
            const sitioValido = producto.sitio.nombre.toLowerCase().replace(/\s+/g, '-') === sitioSeleccionado;
            const profesionalValido = producto.profesional.nombre.toLowerCase().replace(/\s+/g, '-') === profesionalSeleccionado;

            fila.classList.remove("correct", "incorrect", "empty", "half-correct");

            const sitioEsVacio = !sitioSeleccionado;
            const profesionalEsVacio = !profesionalSeleccionado;

            if (sitioEsVacio || profesionalEsVacio) {
                fila.classList.add("empty");
            } else {
                if (sitioValido && profesionalValido) {
                    fila.classList.add("correct");
                } else if (sitioValido || profesionalValido){
                    fila.classList.add("half-correct");
                } else {
                    fila.classList.add("incorrect");
                }
            }

            // Incrementa vacíos si no se seleccionó un sitio o profesional
            if (sitioEsVacio) vacios++;
            if (profesionalEsVacio) vacios++;

            // Incrementa aciertos si el sitio o el profesional son válidos
            aciertos += sitioValido ? 1 : 0;
            aciertos += profesionalValido ? 1 : 0;

            // Incrementa fallos solo si no es un vacío y no es válido
            if (!sitioEsVacio && !sitioValido) fallos++;
            if (!profesionalEsVacio && !profesionalValido) fallos++;
        }
    });

    solutionButton.style.display = "block";
}

// Muestra las soluciones correctas
function mostrarSolucion() {
    solutionBoard.innerHTML = "";
    solutionBoard.style.display = "flex";

    productosSeleccionados.forEach(producto => {
        const solutionRow = document.createElement("div");
        solutionRow.classList.add("row");

        const word = document.createElement("span");
        word.classList.add("word");
        word.textContent = producto.nombre;

        const correctSitio = document.createElement("span");
        correctSitio.classList.add("readonly-text");
        correctSitio.textContent = producto.sitio.nombre;

        const correctProfesional = document.createElement("span");
        correctProfesional.classList.add("readonly-text");
        correctProfesional.textContent = producto.profesional.nombre;

        solutionRow.appendChild(word);
        solutionRow.appendChild(correctSitio);
        solutionRow.appendChild(correctProfesional);

        solutionBoard.appendChild(solutionRow);
    });
}

// Resetea el juego
function resetJuego() {
    document.getElementById("game-board").innerHTML = "";
    solutionBoard.innerHTML = "";
    solutionBoard.style.display = "none";
    solutionButton.style.display = "none";

    productosSeleccionados = [];
    palabras = [];
    inicializarJuego();
}

// Redirige al menú principal
function volverAlMenu() {
    window.location.assign("inicio.html");
}

// Muestra la alerta de validación
function mostrarAlerta() {
    const alertOverlay = document.getElementById("alert-overlay");
    alertOverlay.style.display = "flex";
}

// Cierra la alerta de validación
function ocultarAlerta() {
    const alertOverlay = document.getElementById("alert-overlay");
    alertOverlay.style.display = "none";
}

// Eventos para los botones
document.querySelector('.finish-button').addEventListener('click', () => {
    mostrarAlerta();
    validarJuego();
    finalizarJuego();
});
solutionButton.addEventListener('click', mostrarSolucion);
document.querySelector('.pause-button').addEventListener('click', pausarJuego);
document.querySelector('.reset-button').addEventListener('click', resetJuego);
document.querySelector('.menu-button').addEventListener('click', volverAlMenu);

// Inicializar el juego al cargar la página
document.addEventListener("DOMContentLoaded", inicializarJuego);
