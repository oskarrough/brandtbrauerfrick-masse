import {VideoCustom} from '/video_custom.js'

const hyper = window.hyperHTML;
const grid = document.querySelector(".Loading");
customElements.define("video-custom", VideoCustom);

class View {

  constructor() {
	this.amountReady = 0;
	this.videos = grid.querySelectorAll("video"); 
	this.videos.forEach(video => {
		video.addEventListener("click", this.handleVideoClick.bind(this),false);
		video.addEventListener("canplay", this.handleCanPlay.bind(this),false);
  	});
  }

  handleCanPlay() {
	this.amountReady += 1;
	if (this.amountReady ===  this.videos.length) {
		document.querySelector(".Spinner").classList.add("inactive");
		document.querySelector(".LoadingText").classList.add("inactive");
		document.querySelector(".Loading").classList.remove("Loading");
	}
  }
  
  handleVideoClick() {
	  if (event.target.paused) {
		  /* target is paused and requested by user */
		  this.hideAllVideos();
       		  this.removeActive();
       		  this.addActive(event.target);
		  this.showCurrentActive();
        	  //addControls();
        	  this.muteVideos();
        	  event.target.muted = false;
        	  this.playVideos(event.target.currentTime);
      	  }
      	 else if (!event.target.paused && event.target.muted) {
         	  /* while current instrument is played, user requests for another instrument */
        	  //removeControls();
		  this.hidePreviousActive();
       		  this.removeActive();
        	  this.addActive(event.target);
		  this.showCurrentActive();
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

  showCurrentActive() {
	grid.querySelector(".GridOrchestra video.active").classList.remove("inactive");
  }

  hidePreviousActive() {
	grid.querySelector(".GridOrchestra video.active").classList.add("inactive");
  }

  hideAllVideos(current) {	
	  grid.querySelectorAll("video").forEach(video => {
			video.classList.add("inactive");
	  });
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
	  video.parentNode.firstChild.classList.add("active"); // InstrumentName
  }
  
  removeActive() {
    if (grid.querySelector(".active")) {
	    grid.querySelector("video.active").classList.remove("active");
	    grid.querySelector(".InstrumentName").classList.remove("active");
    }
  }
  
  addControls() {
    if (this.childNodes[0].classList.contains('active')) {
	    this.childNodes[0].controls = true;
    } 
  }
  
  removeControls() {
    if (this.childNodes[0].classList.contains('active')) {
	    this.childNodes[0].controls = false;
    } 
  }
}
window.onload = new View();
