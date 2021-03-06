const parser = new window.UAParser()

// Adds a class to the body when the site is considered unusable.

function toggleMediaContent(mediaQ) {
	// If the screen is below X the site's layout simply doesn't work.
	// Safari, Firefox and iOS has a tiny lag when switching videos that makes it unusable.
	const notAllowedIf =
		mediaQ.matches ||
		parser.getBrowser().name === 'Safari' ||
		parser.getBrowser().name === 'Firefox' ||
		parser.getOS().name === 'iOS'
	document.body.classList.toggle('BlockUsageMode', notAllowedIf)
}

if (matchMedia) {
	const mediaQ = window.matchMedia('(max-width: 650px)')
	mediaQ.addListener(toggleMediaContent)
	toggleMediaContent(mediaQ)
}

const btn = document.querySelector('.IACCEPTTHEDANGER')
btn.addEventListener('click', () => {
	document.body.classList.remove('BlockUsageMode')
})
