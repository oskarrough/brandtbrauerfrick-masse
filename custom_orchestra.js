import {muteVideos,playVideos,pauseVideos,addActive,removeActive,addControls,removeControls} from '/helpers.js'
import {orchestraModel} from '/model.js'

const hyper = window.hyperHTML;

export class OrchestraGrid extends HTMLElement {
    constructor() {
        super();
        this.html = hyper(this); 
        this.state = {}
        this.state.videosIDs =  orchestraModel.ids;
        this.render();
    }

    render() {

        const baseURL = "https://res.cloudinary.com/bbf/video/upload/";
        const encodingImages = "f_auto,q_auto";
        const encodingH265 = "vc_h265,w_1280,c_limit";
        const encodingVP9 = "vc_vp9,w_1280,c_limit";
        const encodingAuto = "vc_auto,w_1280,c_limit";
        this.html`
            <div class='orchestra-grid-box orchestra-grid-box--big'></div>
            ${this.state.videosIDs.forEach(idObject => {
                let urlPoster = baseURL + encodingImages + idObject.id + ".jpg";
                let urlH265 = baseURL + encodingH265 + idObject.id + ".mp4";
                let urlVP9 = baseURL + encodingVP9 + idObject.id + ".webm";
                let urlAuto = baseURL + encodingAuto + idObject.id + ".mp4";
                hyper()`
                    <div class="orchestra-grid-box">
                        <video
                            preload="auto"
                            poster=${urlPoster}
                        >
                            <source
                                src=${urlH265}
                                type="video/mp4; codecs="hvc1"
                            >
                            <source
                                src=${urlVP9}
                                type="video/mp4; codecs="vp9"
                            >
                            <source
                                src=${urlAuto}
                                type="video/mp4"
                            >
                        </video>
                    </div>
                `;
            })}
            <div class="GridOrchestra-box CreditsBox">
                <h1 class="Title">Brandt Brauer Frick's <i>Masse</i></h1>
                <p>Click on any clip to listen to solo voices</p>
                <p><i>Masse</i> is taken from Brand Brauer Frick's <i>Echo</i> album, out on May 31st 2019</p>
                <a href="www.google.com">Credits</a>
            </div>
        `;
        
    }
}
