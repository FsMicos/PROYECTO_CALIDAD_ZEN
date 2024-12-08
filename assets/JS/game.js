// Array de palabras para el juego
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
//esto toma el id del paciente que se envio anteriormente
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('pacienteId');

if (!pacienteId) {
    console.error('No se proporcionó el ID del paciente');
    window.location.href = 'inicio.html'; // Redirige al inicio si no hay id
}

// Función para inicializar los datos de productos y cargar el tablero
async function inicializarJuego() {
    aciertos = 0;
    fallos = 0;
    vacios = 0;
    try {
        // Registrar el inicio del juego
        tiempoInicio = new Date();

        // Llamar a la API para obtener los productos
        const response = await fetch('http://localhost:3000/api/productos');
        const productosAleatorios = await response.json();

        console.log('Productos obtenidos:', productosAleatorios); // Verificar la respuesta

        console.log(productosAleatorios[0]);
        console.log(Object.keys(productosAleatorios[0]));
        palabras = productosAleatorios.map(producto => producto.nombre);
        productosSeleccionados = productosAleatorios;

        console.log('Palabras:', palabras); // Verificar el array de palabras
        console.log('Productos seleccionados:', productosSeleccionados); // Verificar productos seleccionados

        // Recopilar sitios y profesionales únicos
        sitiosUnicos = [...new Map(productosAleatorios.map(producto => [producto.sitio.id, producto.sitio])).values()];
        profesionalesUnicos = [...new Map(productosAleatorios.map(producto => [producto.profesional.id, producto.profesional])).values()];

        console.log('Sitios únicos:', sitiosUnicos); // Verificar sitios únicos
        console.log('Profesionales únicos:', profesionalesUnicos); // Verificar profesionales únicos

        cargarPalabras();
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
}
function calcularTiempo() {
    if (juegoPausado) {
        return Math.floor(tiempoAcumulado / 1000); // Retorna el tiempo acumulado
    } else {
        const tiempoFin = new Date();
        return Math.floor((tiempoFin - tiempoInicio) / 1000); // Diferencia en segundos
    }
}
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


// Función para calcular y enviar un nuevo intento
async function registrarIntento(tiempo) {
    try {
        const response = await fetch('http://localhost:3000/api/intentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_paciente: pacienteId, // id del paciente capturado de la URL
                tiempo: tiempo, // Tiempo calculado en segundos
                aciertos: aciertos,
                fallos: fallos,
                vacios: vacios,
            }),
        });

        if (response.ok) {
            const intento = await response.json();
            console.log('Intento registrado:', intento);
            // alert('Intento registrado con éxito');
        } else {
            const error = await response.json();
            console.error('Error al registrar intento:', error);
            // alert('Error al registrar el intento.');
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        // alert('Error en el servidor al registrar el intento.');
    }
}

// Al finalizar el juego, calcula el tiempo y registra el intento
function finalizarJuego() {
    const tiempo = calcularTiempo(); // Calcular tiempo del juego
    console.log(`Aciertos: ${aciertos}, Fallos: ${fallos}, Vacíos: ${vacios}`);
    registrarIntento(tiempo); // Registrar el intento en la base de datos
    // alert(`Juego finalizado. Tiempo total: ${tiempo} segundos`);
}



// Función para crear una fila con un producto y dos select
function crearFila(producto) {
    console.log('Creando fila para producto:', producto); // Verificar producto

    const row = document.createElement("div");
    row.classList.add("row");

    console.log(producto.ruta_imagen_producto)
    const img = document.createElement("img");
    img.src = producto.ruta_imagen_producto;
    img.alt = "Imagen de ejemplo";
    img.classList.add("row-image");

    // Agregar eventos de zoom a las imagenes
    img.addEventListener('mouseover', () => {
        img.style.transform = "scale(1.25)"; // Cambiar el nivel de zoom aquí
        img.style.transition = "transform 0.3s ease"; // Animación suave
    });

    img.addEventListener('mouseout', () => {
        img.style.transform = "scale(1)"; // Restaurar el zoom
    });

    const word = document.createElement("span");
    word.classList.add("word");
    word.textContent = producto.nombre || "Sin nombre"; // Manejar datos faltantes

    const selectSitio = document.createElement("select");
    selectSitio.classList.add("select-sitio-option");
    agregarOpcionesSelect(selectSitio, sitiosUnicos, "Selecciona un sitio");

    const selectProfesional = document.createElement("select");
    selectProfesional.classList.add("select-profesional-option");
    agregarOpcionesSelect(selectProfesional, profesionalesUnicos, "Selecciona un profesional");

    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(selectSitio);
    row.appendChild(selectProfesional);

    return row;
}

// Función para mezclar un array
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para agregar múltiples opciones al select
function agregarOpcionesSelect(select, items, defaultText) {
    // Mezcla las opciones antes de agregarlas
    mezclarArray(items);

    // Agrega la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    select.appendChild(defaultOption);

    // Agrega las opciones aleatorias
    items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.nombre.toLowerCase().replace(/\s+/g, '-');
        option.textContent = item.nombre;
        select.appendChild(option);
    });
}

// Función para cargar todas las filas de productos dinámicamente
function cargarPalabras() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Asegúrate de limpiar el tablero antes de cargarlo

    productosSeleccionados.forEach((producto, index) => {
        const fila = crearFila(producto);
        console.log(`Fila ${index + 1}:`, fila); // Verificar cada fila generada
        gameBoard.appendChild(fila);
    });

    console.log('Tablero cargado:', gameBoard.innerHTML); // Verificar el contenido del tablero
}

// Función para validar el juego
function validarJuego() {
    aciertos = 0;
    fallos = 0;
    vacios = 0;
    console.log("Juego finalizado");
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
            wordElement.classList.remove("text-white");

            if (sitioSeleccionado === "" || profesionalSeleccionado === "") {
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

            // Inicializa indicadores de vacío
            const sitioEsVacio = !sitioSeleccionado;
            const profesionalEsVacio = !profesionalSeleccionado;

            // Incrementa vacíos si no se seleccionó un sitio o profesional
            if (sitioEsVacio) vacios++;
            if (profesionalEsVacio) vacios++;

            // Incrementa aciertos si el sitio o el profesional son válidos
            aciertos += sitioValido ? 1 : 0;
            aciertos += profesionalValido ? 1 : 0;

            // Incrementa fallos solo si no es un vacío y no es válido
            if (!sitioEsVacio && !sitioValido) fallos++;
            if (!profesionalEsVacio && !profesionalValido) fallos++;


        } else {
            console.error("Producto no encontrado en productosSeleccionados:", productoNombre);
        }
    });
    solutionButton.style.display = "block"; // Mostrar botón de solución
}

// Función para mostrar las soluciones correctas
function mostrarSolucion() {
    solutionBoard.innerHTML = ""; // Limpiar soluciones previas
    solutionBoard.style.display = "flex"; // Mostrar el contenedor de soluciones

    productosSeleccionados.forEach(producto => {
        const solutionRow = document.createElement("div");
        solutionRow.classList.add("row");

        const word = document.createElement("span");
        word.classList.add("word");
        word.textContent = producto.nombre;

        // Crear elementos de texto para mostrar las respuestas correctas
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


// Función para resetear el juego
function resetJuego() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Limpiar el tablero de juego
    solutionBoard.innerHTML = ""; // Limpiar el tablero de soluciones
    solutionBoard.style.display = "none"; // Ocultar el contenedor de soluciones
    solutionButton.style.display = "none"; // Ocultar el botón de solución
    productosSeleccionados = [];
    palabras = [];
    inicializarJuego(); // Reiniciar el juego
}

// Función para redirigir al menú
function volverAlMenu() {
    window.location.assign("inicio.html");
}

// Función para mostrar la alerta
function mostrarAlerta() {
    const alertOverlay = document.getElementById("alert-overlay");
    alertOverlay.style.display = "flex"; // Usar flex para centrar el contenido
}

// Función para cerrar la alerta
function ocultarAlerta() {
    const alertOverlay = document.getElementById("alert-overlay");
    alertOverlay.style.display = "none";
}

// Llama a finalizarJuego en el evento correspondiente (por ejemplo, cuando se valida el juego)

// Eventos para los botones
document.querySelector('.finish-button').addEventListener('click', () => {
    mostrarAlerta();
    validarJuego();  // Validar respuestas del juego
    finalizarJuego();  // Registrar el intento con el tiempo
});
solutionButton.addEventListener('click', mostrarSolucion);
document.querySelector('.pause-button').addEventListener('click', pausarJuego);
document.querySelector('.reset-button').addEventListener('click', resetJuego);
document.querySelector('.menu-button').addEventListener('click', volverAlMenu);
document.addEventListener("DOMContentLoaded", inicializarJuego);
