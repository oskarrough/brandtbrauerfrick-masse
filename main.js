import {VideoCustom} from '/video_custom.js'

const hyper = window.hyperHTML;
const grid = document.querySelector(".GridOrchestra");
customElements.define("video-custom", VideoCustom);

class View {

  constructor() {
    this.state = {};
    grid.querySelectorAll("video").forEach(video => {
            video.addEventListener("click", this.handleVideoClick.bind(this),false);
    });
  }
  
  handleVideoClick() {
      if (event.target.paused) {
        /* target is paused and requested by user */
        this.removeActive();
        this.addActive(event.target);
        //addControls();
        this.muteVideos();
        event.target.muted = false;
        this.playVideos(event.target.currentTime);
      }
      else if (!event.target.paused && event.target.muted) {
        /* while current instrument is played, user requests for another instrument */
        //removeControls();
        this.removeActive();
        this.addActive(event.target);
        //addControls();
        this.muteVideos();
        event.target.muted = false;
      }
      else {
        // User pauses currently listened video.
        this.muteVideos();
       this.pauseVideos();
      }
  }

  muteVideos() {
    grid.querySelectorAll("video").forEach(video => {
      video.muted = true;
    })
  }

  playVideos(currentTime) {
    grid.querySelectorAll("video").forEach(video => {
      console.log(`setting currentTime ${currentTime}`);
      video.currentTime = currentTime;
      video.play();
    })
  }

  pauseVideos() {
    grid.querySelectorAll("video").forEach(video => {
            video.pause();
    })
  }
  
  addActive(video) {
    video.classList.add('active');
  }
  
  removeActive() {
    if (grid.querySelector(".active")) {
      grid.querySelector(".active").classList.remove("active");
    }
  }
  
  addControls() {
    if (this.childNodes[0].classList.contains('active')) {
      this.choldNodes[0].controls = true;
    } 
  }
  
  removeControls() {
    if (this.childNodes[0].classList.contains('active')) {
      this.childNodes[0].controls = false;
    } 
  }
}
window.onload = new View();
