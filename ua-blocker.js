import './web_modules/ua-parser.min.js'

const parser = new UAParser()

// Adds a class to the body when the site is considered unusable.

function toggleMediaContent(mediaQ) {
	// If the screen is below X the site's layout simply doesn't work.
	// Safari and iOS has a tiny lag when switching videos that makes it unusable.
	const notAllowedIf = mediaQ.matches || parser.getBrowser().name === 'Safari' || parser.getOS().name === 'iOS'
	document.body.classList.toggle('BlockUsageMode', notAllowedIf)
}

if (matchMedia) {
	const mediaQ = window.matchMedia('(max-width: 650px)')
	mediaQ.addListener(toggleMediaContent)
	toggleMediaContent(mediaQ)
}
