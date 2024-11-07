// Array de palabras para el juego
let palabras = [];
let productosSeleccionados = [];
let sitiosUnicos = [];
let profesionalesUnicos = [];

// Elementos del DOM
const solutionButton = document.querySelector('.solution-button'); // Botón Mostrar Solución
const solutionBoard = document.getElementById('solution-board'); // Contenedor de soluciones

// Función para inicializar los datos de productos y cargar el tablero
async function inicializarJuego() {
    try {
        // Llamar a la API para obtener los productos
        const response = await fetch('http://localhost:3000/api/productos');
        const productosAleatorios = await response.json();

        palabras = productosAleatorios.map(producto => producto.nombre);
        productosSeleccionados = productosAleatorios;

        // Recopilar todos los sitios y profesionales únicos
        sitiosUnicos = [...new Map(productosAleatorios.map(producto => [producto.sitio.id, producto.sitio])).values()];
        profesionalesUnicos = [...new Map(productosAleatorios.map(producto => [producto.profesional.id, producto.profesional])).values()];

        // Llamar a cargarPalabras después de obtener los productos
        cargarPalabras();
    } catch (error) {
        console.error('Error al inicializar el juego:', error);
    }
}

// Función para crear una fila con un producto y dos select
function crearFila(producto) {
    const row = document.createElement("div");
    row.classList.add("row");

    const img = document.createElement("img");
    img.src = "../assets/img/usuario.png";
    img.alt = "Imagen de ejemplo";
    img.classList.add("row-image");

    const word = document.createElement("span");
    word.classList.add("word");
    word.textContent = producto.nombre;

    // Crear el select de Sitios y añadir todas las opciones únicas
    const selectSitio = document.createElement("select");
    selectSitio.classList.add("select-sitio-option");
    agregarOpcionesSelect(selectSitio, sitiosUnicos, "Selecciona un sitio");

    // Crear el select de Profesionales y añadir todas las opciones únicas
    const selectProfesional = document.createElement("select");
    selectProfesional.classList.add("select-profesional-option");
    agregarOpcionesSelect(selectProfesional, profesionalesUnicos, "Selecciona un profesional");

    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(selectSitio);
    row.appendChild(selectProfesional);

    return row;
}

// Función para agregar múltiples opciones al select
function agregarOpcionesSelect(select, items, defaultText) {
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

// Función para cargar todas las filas de productos dinámicamente
function cargarPalabras() {
    const gameBoard = document.getElementById("game-board");
    productosSeleccionados.forEach(producto => {
        const fila = crearFila(producto);
        gameBoard.appendChild(fila);
    });
}

// Función para validar el juego
function validarJuego() {
    console.log("Juego finalizado");
    alert("¡Has finalizado el juego!");
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

            fila.classList.remove("correct", "incorrect");
            wordElement.classList.remove("text-white");

            if (sitioValido && profesionalValido) {
                fila.classList.add("correct");
                wordElement.classList.add("text-white");
            } else {
                fila.classList.add("incorrect");
                wordElement.classList.add("text-white");
            }
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
    window.location.assign("index.html");
}


// Eventos para los botones
document.querySelector('.finish-button').addEventListener('click', validarJuego);
solutionButton.addEventListener('click', mostrarSolucion);
document.querySelector('.reset-button').addEventListener('click', resetJuego);
document.querySelector('.menu-button').addEventListener('click', volverAlMenu);
document.addEventListener("DOMContentLoaded", inicializarJuego);
