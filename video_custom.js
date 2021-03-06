const hyper = window.hyperHTML

const USE_VIMEO = true

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
		const cloudinaryId = this.getAttribute('cloudinary-id')

		if (USE_VIMEO) {
			return this.html`
				<span class="ActiveDot"></span>
				<video class="Video" src=${src}></video>
			`
			// Alternate version with the iframe embed.
			// const id = src.split('external/')[1].split('.sd')[0]
			// const vimeoSrc = `https://player.vimeo.com/video/${id}`
			// return this.html`<iframe class="Video" src=${vimeoSrc} width="640" height="360" frameborder="0" allow="autoplay"></iframe>`
		}


		// If present, prefer cloudinary to normal src.
		if (cloudinaryId) {
			const {poster, h265, vp9, auto} = this.getCloudinaryUrls(cloudinaryId)
			return this.html`
				<span class="ActiveDot"></span>
				<video class="Video">
					<source src=${h265} type="video/mp4; codecs=hvc1">
					<source src=${vp9} type="video/webm; codecs=vp9">
					<source src=${auto} type="video/mp4">
				</video>
			`
		}

		this.html`
			<span class="ActiveDot"></span>
			<video muted title=${title} src=${src}></video>
		`
	}
	getCloudinaryUrls(id) {
		const base = 'https://res.cloudinary.com/bbf/video/upload/'
		const video = `c_fill,q_auto:eco,w_720`
		return {
			poster: `${base}f_auto,q_auto/${id}.jpg`,
			h265: `${base}${video},vc_h265/${id}.mp4`,
			vp9: `${base}${video},vc_vp9/${id}.webm`,
			auto: `${base}${video},vc_auto/${id}.mp4`
		}
	}
	loadVideo() {
		const video = this.querySelector('.Video')
		const tempSrc = video.getAttribute('data-src')
		if (tempSrc) video.src = tempSrc
	}
}
