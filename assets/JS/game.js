// Array de palabras para el juego
let palabras = [];
let productosSeleccionados = [];
let sitiosUnicos = [];
let profesionalesUnicos = [];
let tiempoInicio; // Variable para almacenar el momento de inicio del juego

// Elementos del DOM
const solutionButton = document.querySelector('.solution-button'); // Botón Mostrar Solución
const solutionBoard = document.getElementById('solution-board'); // Contenedor de soluciones
//esto toma el id del paciente que se envio anteriormente
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('pacienteId');

if (!pacienteId) {
    console.error('No se proporcionó el ID del paciente');
    alert('Error: No se proporcionó el ID del paciente.');
    window.location.href = 'inicio.html'; // Redirige al inicio si no hay id
}

// Función para inicializar los datos de productos y cargar el tablero
async function inicializarJuego() {
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
    const tiempoFin = new Date();
    const tiempoTotal = Math.floor((tiempoFin - tiempoInicio) / 1000); // Diferencia en segundos
    console.log(`Tiempo total del juego: ${tiempoTotal} segundos`);
    return tiempoTotal;
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
            }),
        });

        if (response.ok) {
            const intento = await response.json();
            console.log('Intento registrado:', intento);
            alert('Intento registrado con éxito');
        } else {
            const error = await response.json();
            console.error('Error al registrar intento:', error);
            alert('Error al registrar el intento.');
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        alert('Error en el servidor al registrar el intento.');
    }
}

// Al finalizar el juego, calcula el tiempo y registra el intento
function finalizarJuego() {
    const tiempo = calcularTiempo(); // Calcular tiempo del juego
    registrarIntento(tiempo); // Registrar el intento en la base de datos
    alert(`Juego finalizado. Tiempo total: ${tiempo} segundos`);
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
    window.location.assign("inicio.html");
}

// Llama a finalizarJuego en el evento correspondiente (por ejemplo, cuando se valida el juego)

// Eventos para los botones
document.querySelector('.finish-button').addEventListener('click', () => {
    validarJuego();  // Validar respuestas del juego
    finalizarJuego();  // Registrar el intento con el tiempo
});
solutionButton.addEventListener('click', mostrarSolucion);
document.querySelector('.reset-button').addEventListener('click', resetJuego);
document.querySelector('.menu-button').addEventListener('click', volverAlMenu);
document.addEventListener("DOMContentLoaded", inicializarJuego);
