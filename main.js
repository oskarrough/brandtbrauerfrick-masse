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
  video.classList.add('active')
}

function removeActive() {
  if (document.querySelector('.active')) {
    document.querySelector('.active').classList.remove('active')
  }
}
function addControls() {
  if (document.querySelector(".active")) {
    document.querySelector(".active").controls = true;
  } 
}
function removeControls() {
  if (document.querySelector(".active")) {
    document.querySelector(".active").controls = false;
  } 
}

function handleVideoClick() {
  if (event.target.paused) {
    /* target is paused and requested by user */
    removeActive();
    addActive(event.target);
    //addControls();
    muteVideos()
    event.target.muted = false
    playVideos(event.target.currentTime)
  } else if (!event.target.paused && event.target.muted) {
    /* while current instrument is played, user requests for another instrument */
    //removeControls();
    removeActive();
    addActive(event.target);
    //addControls();
    muteVideos()
    event.target.muted = false
  } else {
    // User pauses currently listened video.
    muteVideos()
    pauseVideos()
  }
}

// Set a class on <html> once all videos can play.
let amountReady = 0
function handleCanPlay(video) {
  amountReady = amountReady + 1
  console.log(`${video.classList[0]} canplay`)
  if (amountReady === videos.length) {
    console.log('ready')
    document.documentElement.classList.add('is-ready')
  }
}

// Set up event listeners.
videos.forEach(video => {
  video.addEventListener('click', handleVideoClick)
  video.addEventListener('canplay', () => handleCanPlay(video))

  // Events below are for debugging and reference.
  // video.addEventListener('play', event => {
  //   console.log(`${video.classList[0]} play`)
  // })
  // video.addEventListener('pause', event => {
  //   console.log(`${video.classList[0]} pause`)
  // })
  // video.addEventListener('timeupdate', event => {
  //   console.log(`${video.classList[0]} timeupdate ${video.currentTime}`)
  // })
})
