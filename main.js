import {VideoCustom} from '/video_custom.js'

const hyper = window.hyperHTML
const grid = document.querySelector('.GridOrchestra')
customElements.define('video-custom', VideoCustom)

class View {
  constructor() {
    this.amountReady = 0
    this.videos = grid.querySelectorAll('video')
    this.mainVideo = document.querySelector(".Main");
    //this.mainVideo.querySelector("video").addEventListener("ended", this.handleRefresh.bind(this),false);
    this.videos.forEach(video => {
      video.parentNode.firstChild.addEventListener("click", this.handlePlay.bind(this),false);
      //video.addEventListener('click', this.handleVideoClick.bind(this), false);
      video.addEventListener('canplay', this.handleCanPlay.bind(this), false);
    })
  }

  handleCanPlay() {
    this.amountReady += 1

    document.querySelector('.LoadingText').textContent = `Loading ${this.amountReady} of ${this.videos.length} videos`

    if (this.amountReady === this.videos.length) {
      document.querySelector('.LoadingText').classList.add('inactive')
      document.querySelector('.GridOrchestra').classList.remove('Loading')
    }
  }

  handlePlay() {
    const targetVideo = event.target.parentNode.querySelector("video");
    const mainVideoCustom = document.querySelector(".Main");
    if (targetVideo.currentTime === 0) {
      /* first play and mute all videos expect selected not muted */
      this.muteVideos();
      targetVideo.muted = false;
      this.removeActive();
      event.target.classList.add("active");
      this.playVideos(targetVideo.currentTime);
    }

    else if (event.target.classList.contains("active")) {
      /* mute selected active video */
      event.target.classList.remove("active");
      targetVideo.muted = true;
    }

    else {
      if (targetVideo.parentNode === mainVideoCustom) {
        /* requesting main -> mute all other videos to avoid superposition */
        this.muteVideos();
        targetVideo.muted = false;
        this.removeActive();
        event.target.classList.add("active");
      }
      else if (mainVideoCustom.firstChild.classList.contains("active")) {
        /* asking for instrument while main is active -> mute main to avoid superposition */
        mainVideoCustom.querySelector("video").muted = true;
        mainVideoCustom.firstChild.classList.remove("active");
        event.target.classList.add("active");
        targetVideo.muted = false;
      }
      else {
        /* asking for instrument while main is not active */
        event.target.classList.add("active");
        targetVideo.muted = false;
      }
    }
  }

  /********* router ********/
  /*handleVideoClick() {
    if (event.target.paused) {
      this.handlePlayVideo()
    } else if (!event.target.paused && event.target.muted) {
      this.handleSwitchVideo()
    } else {
      this.handlePauseVideo()
    }
  }*/

  /****** handle video state *******/

  /*handleRefresh() {
    console.log("reaching end of video");
    document.querySelector(".Reloader").classList.add("active");
    this.videos.forEach( video => {
      video.classList.add("foo");
    })
  }*/

  handlePlayVideo() {
    /* target is paused and requested by user */
    this.removeActive();
    this.addActive(event.target)
    //this.addControls();
    this.muteVideos();
    event.target.muted = false
    this.playVideos(event.target.currentTime)
  }

  handlePauseVideo() {
    // User pauses currently listened video.
    this.muteVideos()
    this.pauseVideos()
  }

  handleSwitchVideo() {
    /* while current instrument is played, user requests for another instrument */
    //this.removeControls();
    this.removeActive()
    this.addActive(event.target)
    //this.addControls();
    this.muteVideos()
    event.target.muted = false
  }

  /********* videos states ***********/
  playVideos(currentTime) {
    grid.querySelectorAll('video').forEach(video => {
      console.log(`setting currentTime ${currentTime}`)
      video.currentTime = currentTime
      video.play()
    })
  }

  /*pauseVideos() {
    grid.querySelectorAll('video').forEach(video => {
      video.pause()
    })
  }*/

  muteVideos() {
    grid.querySelectorAll('video').forEach(video => {
      video.muted = true;
    })
  }

  addActive(video) {
    //video.classList.add('active');
    video.parentNode.firstChild.classList.add('active') // InstrumentName
  }

  removeActive() {
    grid.querySelectorAll('.PlayButton').forEach(playButton => {
      if (playButton.classList.contains('active')) {
        playButton.classList.remove("active");
        //video.parentNode.firstChild.classList.remove('active')
      }
    })
  } 

  /********* controls  ***********/
  /*addControls() {
    grid.querySelector('video.active').controls = true
  }

  removeControls() {
    grid.querySelector('video.active').controls = false
  }*/
}

window.onload = new View();
