// play/pause a video = play/pause all videos
// only clicked video to have sound, others are muted
// video encoding on low quality

const videos = document.querySelectorAll("video");


videos.forEach(video => {
    video.addEventListener("click", event =>{
        if (event.target.paused) {
            playVideo(event.target);
            showBox(event.target);
        }
        else {
            pauseVideo(event.target);
            hideBox(event.target);
        }
        
    })
});