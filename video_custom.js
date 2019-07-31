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
		const title = this.getAttribute('data-title')
		// const id = src.split('external/')[1].split('.sd')[0]
		// const vimeoSrc = `https://player.vimeo.com/video/${id}`
		// <iframe src=${vimeoSrc} width="640" height="360" frameborder="0" allow="autoplay"></iframe>
		this.html`
			<span class="ActiveDot"></span>
			<video muted title=${title} src=${src}></video>
		`
	}

	loadVideo() {
		const video = this.querySelector('video')
		const src = video.getAttribute('data-src')
		if (src) video.src = src
	}
}
