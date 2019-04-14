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

function addActive(video) {
  video.classList.add("active");
}

function removeActive() {
  if (document.querySelector(".active")) {
    document.querySelector(".active").classList.remove("active");
  }
}

function handleVideoClick() {
  if (event.target.paused) {
    /* target is paused and requested by user */
    removeActive();
    addActive(event.target);
    muteVideos()
    event.target.muted = false
    playVideos(event.target.currentTime)
  } else if (!event.target.paused && event.target.muted) {
    /* while current instrument is played, user requests for another instrument */
    removeActive();
    addActive(event.target);
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
