let zoomLevel = 1.5;
const maxZoom = 2; // Nivel máximo de zoom
const minZoom = 0.5; // Nivel mínimo de zoom

function zoomIn() {
  if (zoomLevel < maxZoom) {
    zoomLevel += 0.1;
    applyZoom(); // Actualiza el zoom visualmente
  }
}

function zoomOut() {
  if (zoomLevel > minZoom) {
    zoomLevel -= 0.1;
    applyZoom(); // Actualiza el zoom visualmente
  }
}

function applyZoom() {
  const container = document.querySelector('.container');
  container.style.transform = `scale(${zoomLevel})`;
  container.style.transformOrigin = 'top center'; // Asegura que el zoom se centre en la parte superior

  // Ajusta dinámicamente el tamaño de fuente en los elementos <option>
  const selects = document.querySelectorAll('option');
  selects.forEach((select) => {
    select.style.fontSize = `${zoomLevel * 12}px`;
  });
}