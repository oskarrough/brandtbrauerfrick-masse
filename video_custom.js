const hyper = window.hyperHTML

export class VideoCustom extends HTMLElement {
  constructor() {
    super()
    this.html = hyper(this)
    this.state = {}
  }
  connectedCallback() {
    this.classList.add('GridOrchestra-grid-box')
    this.state.id = this.id
    this.state.title = this.getAttribute('data-title')
    this.render()
  }
  render() {
    const baseURL = 'https://res.cloudinary.com/bbf/video/upload/'
    const encodingImages = 'f_auto,q_auto'
    const encodingH265 = 'vc_h265,w_1280,c_limit'
    const encodingVP9 = 'vc_vp9,w_1280,c_limit'
    const encodingAuto = 'vc_auto,w_1280,c_limit'
    const urlPoster = baseURL + encodingImages + '/' + this.state.id + '.jpg'
    const urlH265 = baseURL + encodingH265 + '/' + this.state.id + '.mp4'
    const urlVP9 = baseURL + encodingVP9 + '/' + this.state.id + '.webm'
    const urlAuto = baseURL + encodingAuto + '/' + this.state.id + '.mp4'
    this.html`
      <svg class="PlayButton" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
        <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
        c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
        C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
        <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
        S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
      </svg>
			<h3 class=${this.state.title}>${this.state.title}</h3>
			<video preload="auto" poster=${urlPoster} class="active">
				<source src=${urlH265} type="video/mp4; codecs=hvc1">
				<source src=${urlVP9} type="video/webm; codecs=vp9">
				<source src=${urlAuto} type="video/mp4">
			</video>
		`
  }
}
