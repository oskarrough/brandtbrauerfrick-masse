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
		this.html`
			<span class="ActiveDot"></span>
			<video src=${src} preload="auto"></video>
		`
	}
}
