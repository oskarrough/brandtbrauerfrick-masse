// Overlay helper.
// the bodyScrollLock stuff is for issues with Safari and iOS

function toggleOverlay(event) {
	const targetOverlay = event.target.getAttribute('data-overlay-target')
	const overlay = document.querySelector(`.${targetOverlay}`)
    
	overlay.classList.toggle('is-active')
	const isActive = overlay.classList.contains('is-active')

	if (isActive) {
		document.removeEventListener('keydown', handleKeyDown)
		bodyScrollLock.enableBodyScroll(overlay)
	} else {
		document.addEventListener('keydown', handleKeyDown)
		bodyScrollLock.disableBodyScroll(overlay)
	}
}

function handleKeyDown(event) {
	if (event.key === 'Escape') {
		toggleOverlay(event)
	}
}

const buttons = document.querySelectorAll('[data-overlay-target]')
buttons.forEach(button => {
	button.addEventListener('click', toggleOverlay)
})
