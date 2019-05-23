import {VideoCustom} from '/video_custom.js'
import {ShareDialog} from '/share-dialog.js'
import {TourDates} from '/tour-dates.js'
import '/overlays.js'
import './model.js'
import {tourData} from './model.js';

const parser = new UAParser();
const hyper = window.hyperHTML
const grid = document.querySelector('.GridOrchestra')
customElements.define('video-custom', VideoCustom)
customElements.define("share-dialog", ShareDialog);

const elements = {
	app: document.querySelector(".App"),
	mainVideo: document.querySelector(".Main > video"),
	videos: document.querySelectorAll("video"),
	presentation: document.querySelector(".Presentation"),
	loading: document.querySelector(".LoadingText"),
	controls: document.querySelector(".Controls"),
	controlsPlay: document.querySelector(".Controls-play"),
	controlsRefresh: document.querySelector(".Controls-refresh"),
	grid: document.querySelector(".GridOrchestra"),
  deviceText: document.querySelector(".DeviceSupportText"),
  fullScreenBtn: document.querySelector(".FullScreenBtn"),
  tourDates: document.querySelector("tour-dates")
}

// feed tour-date with data
elements.tourDates.model = tourData;
customElements.define("tour-dates", TourDates);

class View {
  constructor() {
    this.amountReady = 0
    elements.controlsRefresh.addEventListener('click', this.refresh.bind(this), false);
    elements.fullScreenBtn.addEventListener('click', this.showFullScreen.bind(this),false);
    elements.mainVideo.addEventListener("ended", this.showRefresh.bind(this),false);
    elements.videos.forEach(video => {
      video.addEventListener('click', this.handleVideoClick.bind(this), false)
      video.addEventListener('canplay', this.handleCanPlay.bind(this), false)
    })
  }

  showFullScreen() {
    document.documentElement.requestFullscreen();
  }

  /* loading logic */
  handleCanPlay() {
    this.amountReady += 1
    elements.loading.textContent = `Loading ${this.amountReady} of ${elements.videos.length} videos`
    if (this.amountReady === elements.videos.length) {
      elements.loading.classList.add('is-inactive')
      elements.controls.classList.remove('is-inactive')
      elements.controlsPlay.classList.remove('is-inactive')
      elements.controlsPlay.addEventListener('click', this.handleFirstPlay.bind(this), false)
    }
  }

  /* refresh logic */
  showRefresh() {
	  elements.controls.classList.remove('is-inactive')
    elements.controlsRefresh.classList.remove('is-inactive')
  	elements.grid.classList.add('is-inactive')
  }

  refresh() {
    window.location = '/';
  }

  /* play/ pause/ sync logic */
  handleFirstPlay() {
    elements.grid.classList.remove('is-inactive')
    elements.controls.classList.add('is-inactive')
    elements.controlsPlay.classList.add('is-inactive')
    // Trigger a "click" on the main video.
    this.handlePlayVideo(elements.mainVideo)
    setTimeout(this.syncVideos.bind(this), 500)
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

  handlePlayVideo(target) {
    // target is paused and requested by user
    this.removeActive()
    this.addActive(target)
    this.muteVideos()
    target.muted = false
    this.playVideos()
  }

  handlePauseVideo() {
    this.muteVideos()
    this.pauseVideos()
    this.syncVideos()
  }

  // While playing, if you tap an instrument that is muted
  handleSwitchVideo() {
    this.removeActive()
    this.addActive(event.target)
    this.muteVideos()
    event.target.muted = false
  }

  syncVideos() {
    const masterTime = elements.mainVideo.currentTime
    /*console.log(`all: syncing ${masterTime}`)*/
    elements.videos.forEach(video => {
      video.currentTime = masterTime
    })
  }

  playVideos(currentTime) {
    /*console.log(`all: play`)*/
    elements.videos.forEach(video => {
      video.play()
    })
  }

  pauseVideos() {
    /*console.log('all: pausing')*/
    elements.videos.forEach(video => {
      // console.log({readyState: video.readyState})
      if (video.readyState === 1) {
        return
      }
      video.pause()
    })
  }

  muteVideos() {
    /*console.log('all: muting')*/
    elements.videos.forEach(video => {
      video.muted = true
    })
  }

  addActive(video) {
    video.parentNode.classList.add('is-active')
  }

  removeActive() {
    elements.videos.forEach(video => {
      const el = video.parentNode
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
  }
}

if (matchMedia) {
  const mediaQ = window.matchMedia("(max-width: 650px)");
  mediaQ.addListener(toggleMediaContent);
  toggleMediaContent(mediaQ);  
}

function toggleMediaContent(mediaQ) {
  if (mediaQ.matches || parser.getBrowser().name === "Safari") {
    document.body.classList.add("BlockUsageMode");
  }
  else {
    document.body.classList.remove("BlockUsageMode");
  }
}

window.onload = new View();
