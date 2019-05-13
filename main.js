import {VideoCustom} from '/video_custom.js'
import {ShareDialog} from '/share-dialog.js'
import '/credits.js'

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
  videosMapping: {
    0: document.querySelector(".Percussion video"),
    1: document.querySelector(".Moog video"),
    2: document.querySelector(".Drums video"),
    3: document.querySelector(".Piano video"),
    4: document.querySelector(".Marimba video"),
    5: document.querySelector(".Main video "),
    6: document.querySelector(".Trombone video "),
    7: document.querySelector(".Harp video "),
    8: document.querySelector(".Violin video"),
    9: document.querySelector(".Cello video"),
    10: document.querySelector(".Tuba video")
  } 
}

class View {
  constructor() {
    this.amountReady = 0;
    this.keyQ = [];
    this.handleVideoClick = this.handleVideoClick.bind(this);
    elements.controlsRefresh.addEventListener('click', this.refresh.bind(this), false)
    elements.mainVideo.addEventListener("ended", this.showRefresh.bind(this),false);
    elements.videos.forEach(video => {
      video.addEventListener('click', (event) => {
        this.handleVideoClick(event.target);
      });
      //video.addEventListener('click', this.handleVideoClick.bind(this), false)
      video.addEventListener('canplay', this.handleCanPlay.bind(this), false)
    })

    document.body.addEventListener("keydown", this.handleShortCut.bind(this),false);
  }

  handleShortCut(event) {
    const key = event.key;
    let shortcut = 0;


    if (this.keyQ.length === 0) {
      this.keyQ.push(key);
      shortcut = key;
    }
    else if (this.keyQ[0] == 1 && key == 0) {
      this.keyQ.length = 0;
      shortcut = 10;
    }

    else {
      this.keyQ.length = 0;
      this.keyQ.push(key);
      shortcut = key;
    }

    this.handleVideoClick(elements.videosMapping[shortcut]);
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
    window.location = '/'
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

  handleVideoClick(target) {
    if (target.paused) {
      this.handlePlayVideo(target)
    } else if (!target.paused && target.muted) {
      this.handleSwitchVideo(target)
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
    // this.syncVideos()
    this.playVideos()
  }

  handlePauseVideo() {
    this.muteVideos()
    this.pauseVideos()
    this.syncVideos()
  }

  // While playing, if you tap an instrument that is muted
  handleSwitchVideo(target) {
    this.removeActive()
    this.addActive(target)
    this.muteVideos()
    target.muted = false
    // this.syncVideos()
  }

  syncVideos() {
    const masterTime = elements.mainVideo.currentTime
    console.log(`all: syncing ${masterTime}`)
    elements.videos.forEach(video => {
      video.currentTime = masterTime
    })
  }

  playVideos(currentTime) {
    console.log(`all: play`)
    elements.videos.forEach(video => {
      video.play()
    })
  }

  pauseVideos() {
    console.log('all: pausing')
    elements.videos.forEach(video => {
      // console.log({readyState: video.readyState})
      if (video.readyState === 1) {
        return
      }
      video.pause()
    })
  }

  muteVideos() {
    console.log('all: muting')
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

window.onload = new View()
