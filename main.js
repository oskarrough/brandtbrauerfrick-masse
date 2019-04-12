const videos = document.querySelectorAll("video");

function muteVideos() {
    videos.forEach( video => {
        video.muted = true;
    })
}

function playVideos() {
    videos.forEach(video => {
        video.play();
    })   
}

function pauseVideos() {
    videos.forEach(video => {
        video.pause();
    })
}

function handleVideoClick() {

    if (event.target.paused) {
    /* target is paused and requested by user */
        muteVideos();
        event.target.muted = false;
        playVideos();
    }
    else if (!event.target.paused && event.target.muted){
        /* while current instrument is played, user requests for another instrument */
        muteVideos();
        event.target.muted = false;       
    }
    else {
        /* user pauses currently listened video */
        muteVideos();
        pauseVideos();
    }
}

videos.forEach(video => {
    video.addEventListener("click", handleVideoClick);
})
