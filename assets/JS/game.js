// Array de palabras para el juego
let palabras = [];
let productosSeleccionados = [];

// Función para inicializar los datos de productos y cargar el tablero
async function inicializarJuego() {
    try {
        // Llamar a la API para obtener los productos
        const response = await fetch('http://localhost:3000/api/productos');
        const productosAleatorios = await response.json();

        palabras = productosAleatorios.map(producto => producto.nombre);
        productosSeleccionados = productosAleatorios;

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

    const selectSitio = document.createElement("select");
    selectSitio.classList.add("select-option");
    agregarOpcionesSelect(selectSitio, producto.sitio, "Selecciona un sitio");

    const selectProfesional = document.createElement("select");
    selectProfesional.classList.add("select-option");
    agregarOpcionesSelect(selectProfesional, producto.profesional, "Selecciona un profesional");

    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(selectSitio);
    row.appendChild(selectProfesional);

    return row;
}

// Función para agregar una opción al select
function agregarOpcionesSelect(select, item, defaultText) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    select.appendChild(defaultOption);

    const option = document.createElement("option");
    option.value = item.nombre.toLowerCase().replace(/\s+/g, '-');
    option.textContent = item.nombre;
    select.appendChild(option);
}

// Función para cargar todas las filas de productos dinámicamente
function cargarPalabras() {
    const gameBoard = document.getElementById("game-board");
    productosSeleccionados.forEach(producto => {
        const fila = crearFila(producto);
        gameBoard.appendChild(fila);
    });
}

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", inicializarJuego);
