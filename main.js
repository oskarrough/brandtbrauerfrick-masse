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
    const mainVideo = this.mainVideo.querySelector('video')
    this.handlePlayVideo(mainVideo)
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
		this.syncVideos(target.currentTime)
    this.playVideos()
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
		const video = document.querySelector('video-custom.is-active video')
		this.syncVideos(video.currentTime)
  }

  /********* videos states ***********/

  syncVideos(currentTime) {
		console.log(`syncing ${currentTime}`)
    // console.log(`setting currentTime ${currentTime}`)
    this.videos.forEach(video => {
			let delay = video.currentTime - currentTime
			// console.log({delay})
			if (!video.parentNode.classList.contains('is-active')) {
      	video.currentTime = currentTime 
				let delayAfter = video.currentTime - currentTime
				console.log('synced', {delay, delayAfter})
			} 
    })
  }

  playVideos(time) {
		// if (time) this.syncVideos(time)
    console.log(`playing all`)
    this.videos.forEach(video => {
      video.play()
    })
  }

  pauseVideos() {
    console.log('pausing all')
    this.videos.forEach(video => {
      video.pause()
    })
  }

  muteVideos() {
    console.log('muting all')
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
