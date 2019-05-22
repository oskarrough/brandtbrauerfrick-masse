// credits and tour dates's overlays logic

function toggleOverlay(event) {

  let isActive = elements.creditsOverlay.classList.contains('is-active');

  if (event.target == elements.tourBtn || event.target == elements.tourOverlayBackdrop) {
    isActive = elements.tourOverlay.classList.contains("is-active");
    elements.tourOverlay.classList.toggle("is-active");
  }
  else {
    elements.creditsOverlay.classList.toggle("is-active");
  }

  if (isActive) {
    document.removeEventListener('keydown', handleKeyDown)
  } else {
    document.addEventListener('keydown', handleKeyDown)
  }
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    toggleOverlay()
  }
}

const elements = {
  creditsOverlay: document.querySelector('.CreditsOverlay'),
  creditsOverlayBackdrop: document.querySelector('.CreditsOverlay-backdrop'),
  creditsBtn: document.querySelector('.Credits'),
  tourOverlay: document.querySelector('.TourdatesOverlay'),
  tourOverlayBackdrop: document.querySelector('.TourdatesOverlay-backdrop'),
  tourBtn: document.querySelector('.TourButton')
}

elements.creditsBtn.addEventListener('click', toggleOverlay);
elements.creditsOverlayBackdrop.addEventListener('click', toggleOverlay);
elements.tourBtn.addEventListener('click', toggleOverlay);
elements.tourOverlayBackdrop.addEventListener('click', toggleOverlay);
