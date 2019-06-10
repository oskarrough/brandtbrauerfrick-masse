// Overlay helper.

function toggleOverlay(event) {
	const targetOverlay = event.target.getAttribute('data-overlay-target')
	const overlay = document.querySelector(`.${targetOverlay}`)

	const isActive = overlay.classList.contains('is-active')
	overlay.classList.toggle('is-active')

	if (isActive) {
		document.removeEventListener('keydown', handleKeyDown)
	} else {
		document.addEventListener('keydown', handleKeyDown)
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
