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
    this.removeActive()
    this.addActive(event.target)
    //this.addControls();
    this.muteVideos()
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

  pauseVideos() {
    grid.querySelectorAll('video').forEach(video => {
      video.pause()
    })
  }

  muteVideos() {
    grid.querySelectorAll('video').forEach(video => {
      video.muted = true
    })
  }

  addActive(video) {
    //video.classList.add('active');
    video.parentNode.firstChild.classList.add('active') // InstrumentName
  }

  removeActive() {
    grid.querySelectorAll('video').forEach(video => {
      if (video.classList.contains('active')) {
        //video.classList.remove("active");
        video.parentNode.firstChild.classList.remove('active')
      }
    })
  }

  /********* controls  ***********/
  addControls() {
    grid.querySelector('video.active').controls = true
  }

  removeControls() {
    grid.querySelector('video.active').controls = false
  }
}
window.onload = new View()
