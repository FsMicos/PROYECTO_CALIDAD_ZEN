// Array de palabras para el juego
const palabras = [
    "Palabra 1", "Palabra 2", "Palabra 3", "Palabra 4",
    "Palabra 5", "Palabra 6", "Palabra 7", "Palabra 8",
    "Palabra 9", "Palabra 10", "Palabra 11", "Palabra 12",
    "Palabra 13", "Palabra 14", "Palabra 15", "Palabra 16"
];

// Función para crear una fila con una palabra y dos select
function crearFila(palabra) {
    // Crear el contenedor de la fila
    const row = document.createElement("div");
    row.classList.add("row");

    // Crear la imagen
    const img = document.createElement("img");
    img.src = "../assets/img/usuario.png"; // Ruta de la imagen de ejemplo
    img.alt = "Imagen de ejemplo";
    img.classList.add("row-image");

    // Crear el elemento de palabra
    const word = document.createElement("span");
    word.classList.add("word");
    word.textContent = palabra;

    // Crear el primer select
    const select1 = document.createElement("select");
    select1.classList.add("select-option");
    agregarOpcionesSelect(select1);

    // Crear el segundo select
    const select2 = document.createElement("select");
    select2.classList.add("select-option");
    agregarOpcionesSelect(select2);

    // Añadir elementos a la fila
    row.appendChild(img);
    row.appendChild(word);
    row.appendChild(select1);
    row.appendChild(select2);

    return row;
}

// Función para agregar opciones a un select
function agregarOpcionesSelect(select) {
    const opciones = ["Selecciona una opción", "Opción 1", "Opción 2", "Opción 3"];
    opciones.forEach(opcion => {
        const option = document.createElement("option");
        option.value = opcion.toLowerCase().replace(/\s+/g, '-');
        option.textContent = opcion;
        select.appendChild(option);
    });
}

// Función para cargar todas las filas de palabras dinámicamente
function cargarPalabras() {
    const gameBoard = document.getElementById("game-board");
    palabras.forEach(palabra => {
        const fila = crearFila(palabra);
        gameBoard.appendChild(fila);
    });
}

// Llamada a la función para cargar las palabras cuando se carga la página
document.addEventListener("DOMContentLoaded", cargarPalabras);
