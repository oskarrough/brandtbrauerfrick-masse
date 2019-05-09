export {creditsElements, closeCredits, openCredits, handleKeyDown};
// credits overlay logic

function closeCredits() {
    creditsElements.overlay.classList.remove("is-open");
    document.removeEventListener("keydown", handleKeyDown);
}

function openCredits() {
    creditsElements.overlay.classList.add("is-open");
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === "Escape") {
        closeCredits();
    }
}

const creditsElements = {
  creditsBtn: document.querySelector(".Credits"),
  overlay: document.querySelector(".CreditsOverlay"),
  overlayBackdrop: document.querySelector(".CreditsOverlay-backdrop"),
  closeOverlayBtn: document.querySelector(".CreditsOverlay-button"),
  openOverlayBtn: document.querySelector(".Credits")
}

creditsElements.openOverlayBtn.addEventListener("click", openCredits.bind(this),false);
creditsElements.closeOverlayBtn.addEventListener("click",closeCredits.bind(this),false);
creditsElements.overlayBackdrop.addEventListener("click",closeCredits.bind(this),false);
