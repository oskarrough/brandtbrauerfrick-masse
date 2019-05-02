const hyper = window.hyperHTML

export class VideoCustom extends HTMLElement {
	constructor() {
		super()
		this.html = hyper(this)
		this.state = {}
	}
	connectedCallback() {
		this.render()
	}
	render() {
		const src = this.getAttribute('src')
		const id = this.getAttribute('cloudinary-id')
		const baseURL = 'https://res.cloudinary.com/bbf/video/upload/'
		const encodingImages = 'f_auto,q_auto'
		const encodingH265 = 'vc_h265,w_1280,c_limit'
		const encodingVP9 = 'vc_vp9,w_1280,c_limit'
		const encodingAuto = 'vc_auto,w_1280,c_limit'
		const urlPoster = baseURL + encodingImages + '/' + id + '.jpg'
		const urlH265 = baseURL + encodingH265 + '/' + id + '.mp4'
		const urlVP9 = baseURL + encodingVP9 + '/' + id + '.webm'
		const urlAuto = baseURL + encodingAuto + '/' + id + '.mp4'

		// If present, prefer normal video src to Cloudinary id.
		if (src) {
			return this.html`
				<span class="ActiveDot"></span>
				<video src=${src} preload="auto" poster=${urlPoster}></video>
			`
		}

		this.html`
			<span class="ActiveDot"></span>
			<video preload="auto" poster=${urlPoster}>
				<source src=${urlH265} type="video/mp4; codecs=hvc1">
				<source src=${urlVP9} type="video/webm; codecs=vp9">
				<source src=${urlAuto} type="video/mp4">
			</video>
		`
	}
}
