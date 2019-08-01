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
		const cloudinaryId = this.getAttribute('cloudinary-id')

		// if (vimeoEmbed) {
		// 	const id = src.split('external/')[1].split('.sd')[0]
		// 	const vimeoSrc = `https://player.vimeo.com/video/${id}`
		// 	return this.html`
		// 		<iframe src=${vimeoSrc} width="640" height="360" frameborder="0" allow="autoplay"></iframe>
		// 	`
		// }

		// If present, prefer cloudinary to normal src.
		if (cloudinaryId) {
			const {clean, poster, h265, vp9, auto} = this.getCloudinaryUrls(cloudinaryId)
			return this.html`
				<span class="ActiveDot"></span>
				<video poster=${poster}>
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
		return {
			poster: `${base}f_auto,q_auto/${id}.jpg`,
			clean: `${base}/${id}`,
			h265: `${base}vc_h265,w_1280,c_limit/${id}.mp4`,
			vp9: `${base}vc_vp9,w_1280,c_limit/${id}.webm`,
			auto: `${base}vc_auto,w_1280,c_limit/${id}.mp4`
		}
	}
	loadVideo() {
		const video = this.querySelector('video')
		const src = video.getAttribute('data-src')
		if (src) video.src = src
	}
}
