import {VideoCustom} from '/video_custom.js'

const hyper = window.hyperHTML
const grid = document.querySelector('.GridOrchestra')
customElements.define('video-custom', VideoCustom)

class View {
  constructor() {
    this.amountReady = 0
    this.videos = grid.querySelectorAll('video')
    this.mainVideo = document.querySelector('.Main')
    this.mainVideo.querySelector('video').addEventListener('ended', this.showRefresh.bind(this), false)
    document.querySelector('.Controls-refresh').addEventListener('click', this.refresh.bind(this), false)
    this.videos.forEach(video => {
      video.addEventListener('click', this.handleVideoClick.bind(this), false)
      video.addEventListener('canplay', this.handleCanPlay.bind(this), false)
    })
  }

  handleCanPlay() {
    this.amountReady += 1

    document.querySelector('.LoadingText').textContent = `Loading ${this.amountReady} of ${this.videos.length} videos`

    if (this.amountReady === this.videos.length) {
      document.querySelector('.LoadingText').classList.add('is-inactive')
      document.querySelector('.Controls').classList.remove('is-inactive')
      document.querySelector('.Controls-play').classList.remove('is-inactive')
      document.querySelector('.Controls-play').addEventListener('click', this.handleFirstPlay.bind(this), false)
    }
  }

  handleFirstPlay() {
    document.querySelector('.GridOrchestra').classList.remove('is-inactive')
    document.querySelector('.Controls').classList.add('is-inactive')
    document.querySelector('.Controls-play').classList.add('is-inactive')
    // Trigger a "click" on the main video.
    const mainVideo = this.mainVideo.querySelector('video')
    this.handlePlayVideo(mainVideo)
    setTimeout(this.syncVideos.bind(this), 500)
  }

  showRefresh() {
    document.querySelector('.Controls').classList.remove('is-inactive')
    document.querySelector('.Controls-refresh').classList.remove('is-inactive')
    document.querySelector('.GridOrchestra').classList.add('is-inactive')
  }

  refresh() {
    window.location = 'video.html'
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
    // this.syncVideos()
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
    // this.syncVideos()
  }

  /********* videos states ***********/
  syncVideos() {
    const masterTime = this.mainVideo.querySelector('video').currentTime
    console.log(`all: syncing ${masterTime}`)
    this.videos.forEach(video => {
      video.currentTime = masterTime
    })
  }

  playVideos(currentTime) {
    console.log(`all: play`)
    this.videos.forEach(video => {
      video.play()
    })
  }

  pauseVideos() {
    console.log('all: pausing')
    this.videos.forEach(video => {
      // console.log({readyState: video.readyState})
      if (video.readyState === 1) {
        return
      }
      video.pause()
    })
  }

  muteVideos() {
    console.log('all: muting')
    this.videos.forEach(video => {
      video.muted = true
    })
  }

  addActive(video) {
    video.parentNode.classList.add('is-active')
  }

  removeActive() {
    this.videos.forEach(video => {
      const el = video.parentNode
      if (el.classList.contains('is-active')) {
        el.classList.remove('is-active')
      }
    })
  }
}

window.onload = new View()
