let zoomLevel = 1;
const maxZoom = 2; // Nivel máximo de zoom (200%)
const minZoom = 0.5; // Nivel mínimo de zoom (50%)

function zoomIn() {
  if (zoomLevel < maxZoom) {
    zoomLevel += 0.25;
    applyZoom();
  }
}

function zoomOut() {
  if (zoomLevel > minZoom) {
    zoomLevel -= 0.25;
    applyZoom();
  }
}

function applyZoom() {
  const container = document.querySelector('.container');
  container.style.transform = `scale(${zoomLevel})`;
  container.style.transformOrigin = 'top center';
  container.style.overflow = 'auto'; // Permitir scroll cuando el zoom sea grande

  const selects = document.querySelectorAll('option');
  selects.forEach((select) => {
    select.style.fontSize = `${zoomLevel * 12}px`; // Cambia el tamaño base según el nivel de zoom
  });
}
