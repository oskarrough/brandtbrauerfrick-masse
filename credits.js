// credits overlay logic

function closeCredits() {
    elements.overlay.classList.remove("is-open");
    elements.overlayContent.classList.remove("is-active");
    elements.overlayContent.classList.add("is-inactive");
    document.removeEventListener("keydown", handleKeyDown);
}

function openCredits() {
    elements.overlay.classList.add("is-open");
    elements.overlayContent.classList.remove("is-inactive");
    elements.overlayContent.classList.add("is-active");
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === "Escape") {
        closeCredits();
    }
}

const elements = {
  overlay: document.querySelector(".CreditsOverlay"),
  overlayBackdrop: document.querySelector(".CreditsOverlay-backdrop"),
  overlayContent: document.querySelector(".CreditsOverlay-content"),
  closeOverlayBtn: document.querySelector(".CreditsOverlay-button"),
  openOverlayBtn: document.querySelector(".Credits")
}

elements.openOverlayBtn.addEventListener("click", openCredits.bind(this),false);
elements.closeOverlayBtn.addEventListener("click",closeCredits.bind(this),false);
elements.overlayBackdrop.addEventListener("click",closeCredits.bind(this),false);
