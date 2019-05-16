// credits overlay logic

function toggleCredits() {
  const isActive = elements.overlay.classList.contains('is-active')
  elements.overlay.classList.toggle('is-active')
  if (isActive) {
    document.removeEventListener('keydown', handleKeyDown)
  } else {
    document.addEventListener('keydown', handleKeyDown)
  }
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    toggleCredits()
  }
}

const elements = {
  overlay: document.querySelector('.CreditsOverlay'),
  overlayBackdrop: document.querySelector('.CreditsOverlay-backdrop'),
  openOverlayBtn: document.querySelector('.Credits')
}

elements.openOverlayBtn.addEventListener('click', toggleCredits)
elements.overlayBackdrop.addEventListener('click', toggleCredits)
