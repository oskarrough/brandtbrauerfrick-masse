
export {muteVideos,playVideos,pauseVideos,addActive,removeActive,addControls,removeControls}

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
