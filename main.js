// play/pause a video = play/pause all videos
// only clicked video to have sound, others are muted
// video encoding on low quality

const videos = document.querySelectorAll("video");

function muteAll() {
    videos.forEach( video => {
        video.muted = true;
    })
}

function playAll() {
    videos.forEach(video => {
        video.play();
    })   
}

function pauseAll() {
    videos.forEach(video => {
        video.pause();
    })
}

function handleClick() {

    if (event.target.paused) {
    /* target is paused and requested by user */
        muteAll();
        event.target.muted = false;
        playAll();
    }
    else if (!event.target.paused && event.target.muted){
        /* while current instrument is played, user requests for another instrument */
        muteAll();
        event.target.muted = false;       
    }
    else {
        /* user pauses currently listened instrument */
        muteAll();
        pauseAll();
    }
}

videos.forEach(video => {
    video.addEventListener("click", handleClick);
})