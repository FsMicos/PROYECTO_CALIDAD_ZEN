let zoomLevel = 1;
const maxZoom = 2; // Nivel máximo de zoom (200%)
const minZoom = 0.5; // Nivel mínimo de zoom (50%)

function zoomIn() {
  if (zoomLevel < maxZoom) {
    zoomLevel += 0.1;
    applyZoom();
  }
}

function zoomOut() {
  if (zoomLevel > minZoom) {
    zoomLevel -= 0.1;
    applyZoom();
  }
}

function applyZoom() {
  const container = document.querySelector('.container');
  container.style.transform = `scale(${zoomLevel})`;
  container.style.transformOrigin = 'top left';
  container.style.overflow = 'auto'; // Permitir scroll cuando el zoom sea grande
}
