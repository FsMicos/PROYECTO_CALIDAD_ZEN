// Array de palabras para el juego
let palabras = [];
let productosSeleccionados = [];
let sitiosUnicos = [];
let profesionalesUnicos = [];

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
    selectSitio.classList.add("select-option");
    agregarOpcionesSelect(selectSitio, sitiosUnicos, "Selecciona un sitio");

    // Crear el select de Profesionales y añadir todas las opciones únicas
    const selectProfesional = document.createElement("select");
    selectProfesional.classList.add("select-option");
    agregarOpcionesSelect(selectProfesional, profesionalesUnicos, "Selecciona un profesional");

    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(selectSitio);
    row.appendChild(selectProfesional);

    return row;
}



// Función para agregar múltiples opciones al select
function agregarOpcionesSelect(select, items, defaultText) {
    // Crear la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultText;
    select.appendChild(defaultOption);

    // Agregar cada elemento del array como una opción en el select
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

// Llamar a la función de inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", inicializarJuego);
