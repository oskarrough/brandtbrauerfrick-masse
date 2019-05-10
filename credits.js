// credits overlay logic

function closeCredits() {
    elements.overlay.classList.remove("is-open");
    document.removeEventListener("keydown", handleKeyDown);
}

function openCredits() {
    elements.overlay.classList.add("is-open");
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
  closeOverlayBtn: document.querySelector(".CreditsOverlay-button"),
  openOverlayBtn: document.querySelector(".Credits")
}

elements.openOverlayBtn.addEventListener("click", openCredits.bind(this),false);
elements.closeOverlayBtn.addEventListener("click",closeCredits.bind(this),false);
elements.overlayBackdrop.addEventListener("click",closeCredits.bind(this),false);
