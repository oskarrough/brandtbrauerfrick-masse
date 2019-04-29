import {VideoCustom} from '/video_custom.js'

const hyper = window.hyperHTML
const grid = document.querySelector('.GridOrchestra')
customElements.define('video-custom', VideoCustom)

class View {
  constructor() {
    this.amountReady = 0
    this.videos = grid.querySelectorAll('video')
    this.mainVideo = document.querySelector(".Main");
    this.mainVideo.querySelector("video").addEventListener("ended", this.showRefresh.bind(this),false);
    document.querySelector(".Controls-refresh").addEventListener("click", this.refresh.bind(this),false);
    this.videos.forEach(video => {
      video.addEventListener('click', this.handleVideoClick.bind(this), false);
      video.addEventListener('canplay', this.handleCanPlay.bind(this), false);
    })
  }

  handleCanPlay() {
    this.amountReady += 1

    document.querySelector('.LoadingText').textContent = `Loading ${this.amountReady} of ${this.videos.length} videos`

    if (this.amountReady === this.videos.length) {
      document.querySelector('.LoadingText').classList.add('inactive');
      document.querySelector(".Controls-play").classList.remove("inactive");
      document.querySelector(".Controls-play").addEventListener("click",this.handleFirstPlay.bind(this),false);
    }
  }

  handleFirstPlay() {
    document.querySelector(".GridOrchestra").classList.remove("inactive");
    document.querySelector(".Controls").classList.add("inactive");
    document.querySelector(".Controls-play").classList.add("inactive");
    const mainVideo = this.mainVideo.querySelector("video");
    this.handlePlayVideo(mainVideo);

  }

  showRefresh() {
    document.querySelector(".Controls").classList.remove("inactive");
    document.querySelector(".Controls-refresh").classList.remove("inactive");
    document.querySelector(".GridOrchestra").classList.add("inactive");
  }

  refresh() {
    window.location = "video.html";
  }

  handleVideoClick() {
    if (event.target.paused) {
      this.handlePlayVideo(event.target)
    } else if (!event.target.paused && event.target.muted) {
      this.handleSwitchVideo()
    } else {
      this.handlePauseVideo()
    }
  }

  /****** handle video state *******/

  handlePlayVideo(target) {
    /* target is paused and requested by user */
    this.removeActive()
    this.addActive(target)
    this.muteVideos()
    target.muted = false
    this.playVideos(target.currentTime)
  }

  handlePauseVideo() {
    // User pauses currently listened video.
    this.muteVideos()
    this.pauseVideos()
  }

  handleSwitchVideo() {
    /* while current instrument is played, user requests for another instrument */
    this.removeActive()
    this.addActive(event.target)
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
    video.classList.add('active');
    video.parentNode.firstChild.classList.add('active') // InstrumentName
  }

  removeActive() {
    grid.querySelectorAll('video').forEach(video => {
      if (video.classList.contains('active')) {
        video.classList.remove("active");
        video.parentNode.firstChild.classList.remove('active')
      }
    })
  }
}
window.onload = new View()
