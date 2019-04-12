const videos = document.querySelectorAll('video')

function muteVideos() {
  videos.forEach(video => {
    video.muted = true
  })
}

function playVideos(currentTime) {
  videos.forEach(video => {
		console.log(`setting currentTime ${currentTime}`)
		video.currentTime = currentTime
    video.play()
  })
}

function pauseVideos() {
  videos.forEach(video => {
    video.pause()
  })
}

function handleVideoClick() {
  if (event.target.paused) {
    /* target is paused and requested by user */
    muteVideos()
    event.target.muted = false
    playVideos(event.target.currentTime)
  } else if (!event.target.paused && event.target.muted) {
    /* while current instrument is played, user requests for another instrument */
    muteVideos()
    event.target.muted = false
  } else {
    /* user pauses currently listened video */
    muteVideos()
    pauseVideos()
  }
}

videos.forEach(video => {
  video.addEventListener('click', handleVideoClick)

  // Events below are for debugging and reference.
  video.addEventListener('canplay', event => {
    console.log(`${video.classList[0]} canplay`)
  })
  video.addEventListener('play', event => {
    console.log(`${video.classList[0]} play`)
  })
  video.addEventListener('pause', event => {
    console.log(`${video.classList[0]} pause`)
  })
  video.addEventListener('timeupdate', event => {
    console.log(`${video.classList[0]} timeupdate ${video.currentTime}`)
  })
})
