import {VideoCustom} from '/video_custom.js'
import {default as videosIDs} from '/model.js'

const hyper = window.hyperHTML;
const grid = document.querySelector(".GridOrchestra");
customElements.define("video-custom", VideoCustom);

class View {

  constructor() {
    this.state = {};
    this.state.ids = videosIDs;
    this.render();
  }

  render() {

    grid.appendChild(hyper()`<div class="GridOrchestra-box GridOrchestra-box--big"></div>`);

    videosIDs.forEach(video => {
        grid.appendChild(hyper()`<video-custom id=${video.id}></video-custom>`)
    });
    
    const credits = hyper()`
                        <div class="GridOrchestra-box CreditsBox">
                          <h1 class="Title">Brandt Brauer Frick's <i>Masse</i></h1>
                          <p>Click on any clip to listen to solo voices</p>
                          <p><i>Masse</i> is taken from Brand Brauer Frick's <i>Echo</i> album, out on May 31st 2019</p>
                          <a href="www.google.com">Credits</a>
                        </div>   
                        `;
    grid.appendChild(credits);
  }
}

window.onload = new View();
