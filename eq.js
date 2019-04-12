const song = document.querySelector('audio')
song.autoplay = true
song.loop = true

song.addEventListener('play', doit)

var didRun = false
function doit() {
  if (didRun) return
  didRun = true
  // const song = new Audio('https://res.cloudinary.com/bbf/video/upload/v1553870910/audio/05-masse-zmstr-x-4424.wav')
  // const song = new Audio('./assets/05-masse-zmstr-x-4424.wav')

  const ac = new AudioContext()
  source = ac.createMediaElementSource(song)
  source.connect(ac.destination)

  const analyser = ac.createAnalyser()
  analyser.fftSize = 256
  source.connect(analyser)

  const c = document.querySelector('#c')
  const ctx = c.getContext('2d')
  const W = (c.width = innerWidth)
  const H = (c.height = innerHeight)

  let frameIndex = 0

  const renderFrame = ms => {
    requestAnimationFrame(renderFrame)

    frameIndex++

    // console.log(ms)

    // get audio data
    const audioData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(audioData)
    len = audioData.length

    // clear canvas
		// c.width = W
		
		// motion blur
    ctx.fillStyle = '#00112204'
    ctx.fillRect(0, 0, W, H)
		ctx.save()
		
		// draw from center
    ctx.translate(W / 2, H / 2)
		ctx.lineWidth = 4

		// zoom it more and more
    const zoomLevel = 1.02 // 2%
		ctx.drawImage(c, 0, 0, W, H, (-W / 2) * zoomLevel, (-H / 2) * zoomLevel, W * zoomLevel, H * zoomLevel)

		// cooler rendering?
		ctx.globalCompositeOperation = 'lighter'

    // draw audio data
    const equalizerW = W / 2
    const equalizerH = H / 4
    ctx.strokeStyle = `hsl(${ms / 300}, 50%, 50%)`

		// only render every fourth frame. otherwise its too busy
    if (frameIndex % 4 === 0) {
      ctx.beginPath()
      for (i = 0; i < len; i += 2) {
        index = i < len / 2 ? i : len - 1 - i
        v = 1 - audioData[index] / 256
        ctx.lineTo((i / len - 0.5) * equalizerW, v * equalizerH)
      }
      ctx.stroke()
		}

		function clouds() {
			const x = (Math.random() - 0.5) * equalizerW
			const y = H / 16 - Math.random() * equalizerH
			ctx.strokeStyle = '#cff'
			ctx.beginPath()
			for (i = 0; i < 5; i++) {
				ctx.lineTo(
					x + equalizerW / 64 * Math.cos(x + i),
					y + equalizerW / 64 * Math.sin(x + i)
				)
			}
			ctx.closePath()
			ctx.stroke()
		}

		clouds()

		ctx.globalCompositeOperation = 'source-over'


    ctx.restore()
  }

  renderFrame(0)
}

;(function(doc, win) {
  var screenWidth = win.screen.width / 2
  var screenHeight = win.screen.height / 2
  var el = c

  doc.addEventListener('mousemove', function(e) {
    var centroX = e.clientX - screenWidth
    var centroY = screenHeight - e.clientY
    var degX = centroX * 0.02
    var degY = centroY * 0.03
    // Set rotation
    el.style['transform'] =
      'scale(1.2) perspective(2000px)' + 'rotateY(' + degX + 'deg)  rotateX(' + degY + 'deg)'
  })
})(document, window)
