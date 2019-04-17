const hyper = window.hyperHTML;

export class VideoCustom extends HTMLElement {
    constructor(){
        super();
        this.html = hyper(this);
        this.state = {};
    }
    connectedCallback(){
        this.classList.add("GridOrchestra-grid-box");
        this.state.id = this.id;
        this.render();
    }
    render() {
        const baseURL = "https://res.cloudinary.com/bbf/video/upload/";
        const encodingImages = "f_auto,q_auto";
        const encodingH265 = "vc_h265,w_1280,c_limit";
        const encodingVP9 = "vc_vp9,w_1280,c_limit";
        const encodingAuto = "vc_auto,w_1280,c_limit";
        const urlPoster = baseURL + encodingImages + "/" + this.state.id + ".jpg";
        const urlH265 = baseURL + encodingH265 + "/" + this.state.id + ".mp4";
        const urlVP9 = baseURL + encodingVP9 + "/" + this.state.id + ".webm";
        const urlAuto = baseURL + encodingAuto + "/" + this.state.id + ".mp4";
        this.html`
		<h1 class="InstrumentName active">${this.classList[1]}</h1>
                <video
                    preload="auto"
                    poster=${urlPoster}
		    class="active"
                >
                    <source
                        src=${urlH265}
                        type="video/mp4; codecs=hvc1"
                    >
                    <source
                        src=${urlVP9}
                        type="video/webm; codecs=vp9"
                    >
                    <source
                        src=${urlAuto}
                        type="video/mp4"
                    >
                </video>
        `;
    }
}
