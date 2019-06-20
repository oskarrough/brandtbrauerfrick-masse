// Overlay helper.

function toggleOverlay(event) {
	const targetOverlay = event.target.getAttribute('data-overlay-target')
	const overlay = document.querySelector(`.${targetOverlay}`)

	const isActive = overlay.classList.contains('is-active')
	overlay.classList.toggle('is-active')

	if (isActive) {
		document.removeEventListener('keydown', handleKeyDown)
		bodyScrollLock.enableBodyScroll(overlay)
	} else {
		document.addEventListener('keydown', handleKeyDown)
		// 2. ...in some event handler after showing the target element...disable body scroll
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

// 4. Useful if we have called disableBodyScroll for multiple target elements,
// and we just want a kill-switch to undo all that.
// bodyScrollLock.clearAllBodyScrollLocks();
