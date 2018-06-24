// DO NOT CHANGE THIS FILE, THIS IS ALL BASE STUFF!
// TO ADD YOUR STUFF GOTO !gamemode.js !

res = resolution.split("x")

draw = document.getElementById("draw").getContext("2d")
document.getElementById("draw").dragable = "false"
width = document.getElementById("draw").width = res[0]
height = document.getElementById("draw").height = res[1]
document.getElementsByTagName("body")[0].style.width = width + "px"

showFPS = 0
fps = 0
fpsCurrent = 0
gfx = []
camera = [0,0,true,0,0]
lastTime = 0
gamemode = 0
lastgamemode = -1
ram = []
key = []
keyOnce = []
objects = []
ram["frames"] = 0
// Disable bluring, we no like // it no work because of shitty browsas :(

//draw.imageSmoothingEnabled = false;

function init() {

	// Draw initial background color
	
	draw.fillStyle = bg
	draw.fillRect(0,0,width,height)
	
	// Draw loading text
	
	draw.fillStyle = loadingTextColor
	draw.font = loadingTextStyle
	var textLength = draw.measureText(loadingText)
	if (textLength.width >= width) {
		draw.fillText(loadingText,0,height/2,width)
	} else {
		draw.fillText(loadingText,width/2-textLength.width/2,height/2,width)
	}
	mouse = new mouseEngine()
	sound = new soundEngine()
	keyboard = new keyboardEngine()
	loop()
}

function loop (currentTime) {
	// Scaling stuff

	temp = (window.innerHeight / res[1]) >= (window.innerWidth / res[0])
	if (temp) {
		temp = window.innerWidth / res[0]
	} else {
		temp = window.innerHeight / res[1]
	}
	switch (autoScale) {
		case "integer":
			scale = Math.floor(temp)
			break
		case "float":
			scale = temp
			break
		default:
			scale = initScale
	}
	
	width = document.getElementById("draw").width = res[0]
	height = document.getElementById("draw").height = res[1]
	document.getElementsByTagName("body")[0].style.zoom = scale
	
	draw.fillStyle = bg
	draw.fillRect(0,0,width,height)

	if (lastgamemode != gamemode) {
		eval("init_gamemode"+gamemode+"()")
		lastgamemode = gamemode
	}
	
	eval("gamemode"+gamemode+"()")
	
	showBuild()
	mouse.draw()
	
	if (showFPS) {
		draw.fillStyle = "#000"
		draw.fillRect(width-64,0,64,32)
		var fpsColR = Math.floor((60-fps)/60*512)
		var fpsColG = Math.floor(fps/60*512)
		var fpsColB = 0
		draw.fillStyle = "rgb("+fpsColR+","+fpsColG+","+fpsColB+")"
		draw.fillText(fps+" FPS",width-60,24)
	}
	
	ram["frames"]++
	fpsCurrent++
	if (!debug) {
		window.requestAnimationFrame(loop)
	}
	
}

function fpsC () {
	fps = fpsCurrent
	fpsCurrent = 0
	setTimeout("fpsC()",1000)
}
fpsC()