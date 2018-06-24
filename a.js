// BUILD: 518 
// Compiled: 26.04.2015, 18:58:51 | 1430067531

build = 518+' | 26.04.15, 18:58:51 | 1430067531 (PHPCompiler)'

//File: !!config.js

                 ////////////////////////
                 // Configuration File //
////////////////////////////////////////////////////////////
// NOTE: USE "!!userconfig.js" for your specific configs! //
// Here are only the engine specific configs.             //
////////////////////////////////////////////////////////////

// DEBUG FLAG //
debug = false

// GRAPHICS SETTINGS //

autoScale = "noscale"
bg = "#FFFFFF"
initScale = 1
resolution = "800x480"

// MOUSE SETTINGS //

hideMouseTime = 120

// OTHER SETTINGS //

loadingTextColor = "#000000" // Color of default Text.
loadingTextStyle = "32px monospace" // Fontstyle of loading
loadingText = "Loading..." // Text to tell people it's loading

showBuildVersion = false // Shows the current build version


//File: !!controls.js

// Mapping controls to standardized buttons
controls = []

// Directions
controls["up"] = 38
controls["down"] = 40
controls["left"] = 37
controls["right"] = 39

// Standard Buttons (accept, cancel, extra)
controls["accept"] = 32
controls["cancel"] = 86
controls["extra"] = 66

// Engine specific hotkeys (mostly mapped on F-keys)

controls["scaleMode"] = 113
controls["showBuild"] = 123
controls["showFPS"] = 115


//File: !!userconfig.js

////////////////////////
// Your custom config //
////////////////////////

//File: !base.js

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

//File: !gui.js

function guiEngine(drawBox,listOfItems,x,y,backgroundColor) {
	this.menu = listOfItems
	this.x = x
	this.y = y
	this.bg = backgroundColor
	this.drawBox = drawBox
	this.init = false
	this.lineHover = 0
	this.draw = function () {
		if (this.init == 2) {
			var tempX = this.x
			var tempY = this.y
			var longestOption = -1
			for (var line = 0; line < this.menu.length; line++) {
				if (longestOption <= this.menu[line].length) {
					longestOption = this.menu[line].length
				}
			}
			
			if (this.drawBox == "full") {
				this.x = 0
				
				
				
				this.y += 16
				this.x = 32
			}
			if (this.drawBox == "fit") {
				draw.fillStyle = this.bg
				draw.fillRect(this.x,this.y,(longestOption+2)*16,(this.menu.length+1)*16)
				for (var i = 0; i < longestOption+2; i++) {
					draw.drawImage(gfx["gui"],16,0,16,16,i*16+this.x,this.y,16,16)
					draw.drawImage(gfx["gui"],16,0,16,16,i*16+this.x,this.y+(16)+this.menu.length*16,16,16)
				}
				for (var i = 0; i < this.menu.length+2; i++) {
					draw.drawImage(gfx["gui"],0,16,16,16,this.x,this.y+i*16,16,16)
					draw.drawImage(gfx["gui"],0,16,16,16,this.x+(longestOption+2)*16,this.y+(i*16),16,16)
				}
				
				draw.drawImage(gfx["gui"],0,0,16,16,this.x,this.y,16,16)
				draw.drawImage(gfx["gui"],32,0,16,16,this.x+(longestOption+2)*16,this.y,16,16)
				draw.drawImage(gfx["gui"],0,32,16,16,this.x,this.y+(this.menu.length+1)*16,16,16)
				draw.drawImage(gfx["gui"],32,32,16,16,this.x+(longestOption+2)*16,this.y+(this.menu.length+1)*16,16,16)
				
				this.y += 16
				this.x += 32
			}
		
			for (var line = 0; line < this.menu.length; line++) {
				var temp = this.menu[line]
				for(var i = 0; temp.length > i; i++) {
					var charPos = temp.charCodeAt(i)
					var charPosCol = charPos % 16
					var charPosRow = (charPos-charPosCol)/16
					draw.drawImage(gfx["font"],charPosCol*16,charPosRow*16,16,16,i*16+this.x,this.y+line*16,16,16)
				}
				if (this.lineHover == line) {
					draw.drawImage(gfx["font"],144,144,16,16,this.x-16,this.y+line*16,16,16)
				}
			}
			this.x = tempX
			this.y = tempY
		}
	}
	
	this.interact  = function () {
		var longestOption = -1
		for (var line = 0; line < this.menu.length; line++) {
			if (longestOption <= this.menu[line].length) {
				longestOption = this.menu[line].length
			}
		}
		if (
				mouse.y >= this.y + 16 &&
				mouse.y <= this.y + this.menu.length * 16 + 15 &&
				mouse.x >= this.x &&
				mouse.x <= this.x+longestOption*16+32
			) {
			var option = Math.floor(( mouse.y - this.y)/16)-1
			this.lineHover = option
		}
		if (key[controls["up"]]) {
			this.lineHover--
			if (this.lineHover < 0) {
				this.lineHover = this.menu.length-1
			}
		}
		if (key[controls["down"]]) {
			this.lineHover++
			if (this.lineHover == this.menu.length) {
				this.lineHover = 0
			}
		}
		
		
	}
	
	gfx["font"] = new Image()
	gfx["font"].src = "img/font.png"
	gfx["font"].onload = function () {
		gui.init++
	}
	gfx["gui"] = new Image()
	gfx["gui"].src = "img/gui.png"
	gfx["gui"].onload = function () {
		gui.init++
	}
}

//File: !keyboard.js

function keyboardEngine() {
	onkeydown = onkeyup = function(e){
		e = e || event; // to deal with IE
		
		
		
		key[e.keyCode] = e.type == 'keydown';
		
		
		
		
		
		if (key[controls["showBuild"]]) {
			showBuildVersion = Math.abs(showBuildVersion - 1)
		}
		
		if (key[controls["showFPS"]]) {
			showFPS = Math.abs(showFPS - 1)
		}
		
		if (key[controls["scaleMode"]]) {
			switch (autoScale) {
				case "float":
				autoScale="integer"
				break
				
				case "integer":
				autoScale="noscale"
				break
				
				default:
				autoScale = "float"
			}
			console.log(autoScale)
			e.preventDefault()
		}
		
	}
}

//File: !map.js

function mapEngine(mapID,entrance) {
	if (entrance == undefined) {
		entrance = -1
	}
	this.entrance = entrance
	this.gfx = []
	this.gfxIndex = []
	this.gfxInfo = []
	this.mapId = mapID
	this.gfxLoaded = false
	
	this.loader = function (mapID) {
		var ajax = new XMLHttpRequest()
		ajax.open("GET","map/"+mapID+".json")
		ajax.send(null)
		ajax.onreadystatechange = function () {
			if (ajax.status == 200 && ajax.readyState == 4) {
				map.json = JSON.parse(ajax.responseText)
				map.parse()
			}
		}
	}
	
	
	this.draw = function () {
		if (this.gfxLoaded == false) {
			var gfxLoaded = 0
			for (var gfx = 0;gfx < this.gfx.length; gfx++) {
				if (this.gfx[gfx].complete) {
					gfxLoaded++
				}
			}
			if (gfxLoaded == this.gfx.length) {
				this.gfxLoaded = true
				console.log("Graphics loaded")
			}
			return true
		}
		
		
		for (var l = 0; l < this.json.layers.length; l++) {
			var layer = this.json.layers[l]
			if (layer.type == "tilelayer" && layer.visible) {
				this.drawTilelayer(layer)
			}
		}
		
		//console.log(layerData)
	}
	
	this.tileInteraction = function (obj) {
		console.log(this)
		var objectX = Math.round(obj.x/this.json.tilewidth)
		var objectY = Math.round(obj.y/this.json.tileheight)
	
		var tileIDinside = this.json.layers[0].data[objectX+objectY*this.json.width]
	
		//Object inside
		
		//Object below
		
		//Object right
		
		//Object left
		
		//Object top
		
	}
	
	this.animatedTile = function(animatedFrames) {
		// NI
	}
	
	this.parse = function () {
	
		// Camera max position
		
		camera[3] = map.json.width*map.json.tilewidth
		camera[4] = map.json.height*map.json.tileheight
		
		// Player startposition
		
		if (map.entrance == -1) {
			console.log("AAAAAAAAA HELP, SOMETHING WENT WRONG, MY CREATOR IS A DOUCHE AND IS NOT ABLE TO PUT A ENTRANCE OBJECT INTO THE LEVEL :(")
			player.x = 128
			player.y = 128
		}

		// Loading tilemap images and push their index onto a stack so we can render multiple Tilesets
		
		for(var i = 0; map.json.tilesets.length > i; i++) {
			var ts = map.json.tilesets[i]
			map.gfx[i] = new Image()
			map.gfx[i].src = ts.image.replace("../","")
			map.gfxIndex.push(ts.firstgid)
			map.gfxInfo.push([Math.floor(ts.imagewidth/ts.tilewidth),Math.floor(ts.imageheight/ts.tileheight)])
		}
	}
	
	this.drawTilelayer = function (layer) {
		
		var w = layer.width
		var h = layer.height
		
		var tileHeight = 16
		var tileWidth = 16
		
		var camX = camera[0]
		var camY = camera[1]
		
		var camXoffset = Math.floor(camX/tileWidth)-1
		var camYoffset = Math.floor(camY/tileHeight)-1
		
		var layerData = layer.data
		
		for (var y = camYoffset; y < h; y++) {
			for (var x = camXoffset; x < w; x++) {
				var currentTile = layerData[x+y*w]
				if (currentTile > 0) {
					var useGFX = -1
					for(var gfxID = 0; gfxID < this.gfx.length; gfxID++) {
						if (currentTile >= this.gfxIndex[gfxID]) {
								useGFX = gfxID
						}
					}
					if (useGFX == -1) {
						alert("GFX Error")
						return true
					}
					var tileToDraw = currentTile-this.gfxIndex[useGFX]
					var tsWidth = this.gfxInfo[useGFX][0]
					var tsHeight = this.gfxInfo[useGFX][1]
					draw.drawImage(this.gfx[useGFX],(tileWidth+1)*(tileToDraw%tsWidth),Math.floor((tileToDraw-(tileToDraw%tsWidth))/tsHeight)*(tileHeight+1),tileWidth,tileHeight,x*tileWidth-camX,y*tileHeight-camY,tileWidth,tileHeight)
					
					
					//draw.drawImage(gfx[0],(tileWidth+spacing)*(currentTile%gfxWidth),Math.floor(currentTile/gfxWidth)*(tileHeight+spacing),tileWidth,tileHeight,x*tileWidth-camX,y*tileHeight-camY,tileWidth,tileHeight)
				}
			}
		}
		
		// Draw player, if he is on that layer
		//console.log(layer.properties)
		if (layer.properties != undefined) {
			player.draw()
		}
	}
	
	this.drawPlayer = function () {
		player.draw()
	}
	
	this.loader(mapID)
	
}

//File: !mouse.js

function mouseEngine() {
	this.x = -9001
	this.y = -9001
	this.gfx = "img/mouse.png"
	var temp = document.getElementById("draw").getBoundingClientRect()
	this.canvasXoffset = temp.left
	this.canvasYoffset = temp.top
	this.state = 1
	this.show = 0
	this.leftClick = false
	this.draw = function () {
		if (this.show != 0 && this.loaded) {
			draw.drawImage(gfx["mouse"],0,16*this.state,16,15,this.x,this.y,16,15)
			draw.save()
			draw.font = "8px courier"
			draw.fillStyle="#FFFFFF"
			draw.shadowColor="#000000"
			draw.shadowBlur = 1
			draw.fillText(this.x+"|"+this.y,this.x+16,this.y+16)
			draw.fillText((this.x+camera[0])+"|"+(this.y+camera[1]),this.x+16,this.y+24)
			draw.fillText("LMB: "+this.leftClick,this.x+16,this.y+32)
			draw.restore()
			this.show--
		}
	}
	
	document.getElementById("draw").addEventListener('mousemove', function (e) {
		var temp = document.getElementById("draw").getBoundingClientRect()
		mouse.canvasXoffset = temp.left
		mouse.canvasYoffset = temp.top
		mouse.show = hideMouseTime
		mouse.x = Math.floor((e.clientX-mouse.canvasXoffset)/scale)
		mouse.y = Math.floor((e.clientY-mouse.canvasYoffset)/scale)
		mouse.draw()
	})
	
	document.getElementById("draw").addEventListener('mousedown', function (e) {
		mouse.leftClick = true
	})
	document.getElementById("draw").addEventListener('mouseup', function (e) {
		mouse.leftClick = false
	})
	document.getElementById("draw").addEventListener('mouseout', function (e) {
		mouse.show = 0
		mouse.leftClick = false
	})
	
	gfx["mouse"] = new Image()
	gfx["mouse"].src = this.gfx
	gfx["mouse"].onload = function () {
		mouse.loaded = true
	}
}

//File: !showBuild.js

function showBuild() {
	if (showBuildVersion) {
		draw.font = "14px Arial"
		var x = draw.measureText(build + " | Frame: " + ram["frames"])
		draw.fillStyle = "rgba(0,0,0,0.5)"
		draw.fillRect(0,height-16,x.width + 16,16)
		draw.fillStyle = "#FFFFFF"
		draw.fillText((build + " | Frame: " + ram["frames"]),8,height-3)
	}
}

//File: !sound.js

function soundEngine() {
	this.container = document.getElementById("sfxcontainer")
	this.sfxlibrary = []
	this.musicStack = []
	this.currentMusic = ""
	this.volume = 100
	this.isFade = false
	this.fadeSpeed = 0
	this.side = "L"
	this.nextSong = ""
	this.playSFX = function (sfx, vol, pan) {
		this.container.innerHTML = "<audio autoplay><source src=\""+sfx+"\" type=\"audio/ogg\"></audio>"
	}
	this.playMusic = function(track,fade) {
		
		
	}
	this.load = function (filename,type) {
	}
}

//File: !sprite.js

draw.sprite = function(object) {
	// Draw Sprite only if it is in visibile canvas
	if (
			object.x >= camera[0] - object.imgWidth - 1 &&
			object.x <= camera[0] + object.imgWidth + res[0] &&
			object.y >= camera[1] - object.imgHeight - 1 &&
			object.y <= camera[1] + res[1] + object.imgHeight
			) {
		draw.drawImage(
										object.gfx,
										object.imgXoffset+object.spriteMapX[object.spriteDisplay],
										object.imgYoffset+object.spriteMapY[object.spriteDisplay],
										object.imgWidth,
										object.imgHeight,
										(object.x-camera[0]),
										(object.y-camera[1]),
										object.imgWidth,
										object.imgHeight
									)
	}
}

//File: drawGrid.js

function drawGrid() {
	this.debug = function () {
	
	}
	
	this.draw = function () {
		var tempImg = new Image()
		tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAACtJREFUOE9j+I8DNOAAoxqQAVQeA5CuAUpjAKg+DDCqARlA5TEAiRr+/wcA6pE+nyxJC/UAAAAASUVORK5CYII="

		var pattern = draw.createPattern(tempImg,'repeat')
		draw.scale(scale,scale)
		draw.fillStyle = pattern
		draw.fillRect(0-camera[0]%16,0-camera[1]%16,width+16,height+16)
		draw.scale(1,1)

	}
	
	this.tick = function () {
	
	}
}

//File: gamemode0.js

/**
*	GAMEMODE 00 INIT
*/


function init_gamemode0() {
	ram["fadeTime"] = 180
	bg = hdmaGradient(height,"0;#444444","0.1;#000000","0.9;#000000","1;#444444")
	
	gfx["logo"] = new Image()
	gfx["logo"].src = "img/logo.svg"
	gfx["logo"].onload = function () {
		ram["logoLoaded"] = true
	}
	ram["logoLoaded"] = false
}

/**
*	GAMEMODE 00
*	Fade in
*/

function gamemode0() {

	if (ram["logoLoaded"]) {
		draw.drawImage(gfx["logo"],width/2-128,height/2-128,256,256)
	}
	
	draw.fillStyle = "rgba(0,0,0," + (ram["fadeTime"]/180) + ")"
	draw.fillRect(0,0,width,height)
	ram["fadeTime"]--
	
	if (key[27]) {
		gamemode = 2
	}
	
	if (ram["fadeTime"]==-180) {
		gamemode++
	}
	
}

//File: gamemode1.js

/**
*	GAMEMODE 01 INIT
*/


function init_gamemode1() {
	ram["fadeTime"] = 180
	bg = hdmaGradient(height,"0;#444444","0.1;#000000","0.9;#000000","1;#444444")
}

/**
*	GAMEMODE 01
*	Fade in
*/

function gamemode1() {

	if (ram["logoLoaded"]) {
		draw.drawImage(gfx["logo"],width/2-128,height/2-128,256,256)
	}
	
	draw.fillStyle = "rgba(0,0,0," + (1-(ram["fadeTime"]/180)) + ")"
	draw.fillRect(0,0,width,height)
	ram["fadeTime"]--
	
	if (key[27]) {
		gamemode = 2
	}
	
	if (ram["fadeTime"]==-60) {
		gamemode++
	}
	
}

//File: gamemode2.js

/**
*	GAMEMODE 02 INIT
*/


function init_gamemode2() {
	bg = hdmaGradient("0;#000","0.2;#111","0.8;#000","1;#111")
	draw.fillStyle = bg
	draw.fillRect(0,0,width,height)
	ram["fadeTime"] = 120
	ram["overlayGradient"] = hdmaGradient("0;rgba(0,0,0,0)","0.9;rgba(0,0,0,0)","1;rgba(31,63,255,1)")
	gfx["titlescreen"] = new Image()
	gfx["titlescreen"].src = "img/titlescreen.svg"
	gfx["titlescreen"].onload = function () {
		ram["c_titlescreen"] = document.createElement("canvas")
		ram["c_titlescreen"].height = 240
		ram["c_titlescreen"].width = 600
		
		var c = ram["c_titlescreen"].getContext("2d")
		c.drawImage(gfx["titlescreen"],0,0,600,240)
		ram["titlescreenLoaded"] = true
	}
	ram["titlescreenLoaded"] = false
	tsmenu = new titlescreenMenu(["Start Game","Options"],0,300)
	opmenu = new optionsMenu(234)
	sf = new starfield(128,4)
	ram["tsmode"] = "title"
}

/**
*	GAMEMODE 02
*	Fade in
*/

function gamemode2() {
	
	// Starfields
	
	sf.draw()
	
	// Menu
	switch (ram["tsmode"]) {
		case "title":
			tsmenu.draw()
			break
		case "option":
			opmenu.draw()
			break
		default:
	}
	
	
	// Logo
	
	if (ram["titlescreenLoaded"]){
		draw.drawImage(ram["c_titlescreen"],100,0)
	}
	
	// Overlaygradient
	
	draw.fillStyle = ram["overlayGradient"]
	draw.fillRect(0,0,width,height)
	
	// Version info
	
	txt = build
	
	draw.font = "16px monospace"
	var xmax = draw.measureText(txt).width
	
	draw.beginPath()
	draw.moveTo(width+1,height-16)
	draw.lineTo(width-xmax-32,height-16)
	draw.lineTo(width-xmax-16,height)
	draw.lineTo(width+1,height+1)
	draw.closePath()
	draw.strokeStyle = "#000"
	draw.fillStyle = "rgba(16,32,128,0.5)"
	
	draw.fill()
	draw.stroke()
	draw.fillStyle = "#FFF"
	draw.fillText(txt,width-xmax,height-2)
		
	// Black2Transparent
	
	draw.fillStyle = "rgba(0,0,0," + (ram["fadeTime"]/120) + ")"
	draw.fillRect(0,0,width,height)
	
	
	if (ram["fadeTime"]) {
		ram["fadeTime"]--
	}
}

//File: gamemode3.js

/**
*	GAMEMODE 03 INIT
*/

function init_gamemode3() {
	ram["fadeTime"] = 60
}

/**
*	GAMEMODE 03
*	
*/

function gamemode3() {

	sf.draw()

	draw.fillStyle = "rgba(0,0,0," + (1-(ram["fadeTime"]/180)) + ")"
	draw.fillRect(0,0,width,height)
	ram["fadeTime"]--
	
	if (ram["fadeTime"] == 0) {
		gamemode++
	}
	
}

//File: gamemode4.js

/**
*	GAMEMODE 04 INIT
*/

function init_gamemode4() {
	ram["fadeTime"] = 60
	textbox = new textboxEngine("Phase " + ram["phase"],"floating",[width*1.5,height/2,-3,0])
	p = new player(16,height/2)
	ram["score"]=0
	ram["lives"]=5
	ram["powerups"]=[1,0,0,0,0,0,0,0,0,0]
	ram["powerupRotator"] = 0
	interf = new ingameInterface()
	level = new levelData()
}

/**
*	GAMEMODE 04
*	
*/

function gamemode4() {

	sf.draw()
	
	if (textbox.arg0[0]>-width/2) {
		textbox.draw()
	}
	
	level.tick()
	
	p.tick()
	
	interf.draw()
	
	draw.fillStyle = "rgba(0,0,0," + (ram["fadeTime"]/60) + ")"
	draw.fillRect(0,0,width,height)
	
	ram["fadeTime"]--
	
}

//File: hdma.js

function hdmaGradient(h) {
	if (arguments.length <= 1) {
		return "#FF00FF"
	}
	if (arguments.length == 2) {
		var temp = arguments[1].split(";")
		return temp[1]
	}
	newBGColor = draw.createLinearGradient(0,0,0,height)
	for (var i = 1; i < arguments.length; i++) {
		var temp = arguments[i].split(";")
		newBGColor.addColorStop(temp[0],temp[1])
	}

	return newBGColor
}

//File: ingameInterface.js

function ingameInterface () {
	this.powerupLabel = [
												"Speed Up",
												"Missle",
												"Tailgun",
												"360°",
												"Laser",
												"Option",
												"Shield",
												"Reflect",
												"Speed Down",
												"???"
											]
	
	this.powerupMaxLevel = [8,2,1,1,1,4,2,1,1,1]
	
	this.color = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(16+16*noise)+","+Math.floor(32+32*noise)+","+128+","+(0.5+noise/8)+")"
		return c
	}
	
	this.activeColor = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+="255,192," + Math.floor(32+32*noise)+",0.75)"
		return c
	}
	
	this.textColor = function () {
		var c = "rgba("
		var white = 255-Math.floor(32*Math.random())
		c+=white+","+white+","+white+",0.75)"
		return c
	}
	
	this.draw = function() {
	
		// Score and Life display
	
		draw.fillStyle = this.textColor()
		draw.font = "16px monospace"
		draw.fillText("Score: " + ram["score"],8,16)
		draw.fillText("Lives: " + ram["lives"],8,32)
		
		// Powerups
		
		draw.font = "12px monospace"
		draw.fontAlign = "center"
		for (var i = 0; i < ram["powerups"].length; i++) {
			draw.fillStyle = this.color()
			if (ram["powerupRotator"] > 0 && ram["powerupRotator"] - 1 == i) {
					draw.fillStyle = this.activeColor()
			}
			draw.fillRect(i*(width/10)-1,height-16,(width/10),16)
			draw.fillStyle = this.textColor()
			if (this.powerupMaxLevel[i] != ram["powerups"][i]) {
				draw.fillText(this.powerupLabel[i],i*(width/10)+8,height-2)
			}
			draw.fillRect(i*(width/10)-1,height-16,1,16)
			
			
		}
		
		draw.fillStyle = this.textColor()
		draw.fillRect(0,height-16,width,1)
		
		
	}
}

//File: levelData.js

function levelData() {
	this.level = 0
	this.position = 0
	this.showProgress = true
	
	// Level lengths in ticks (60 ticks per second)
	this.levelLengths = [10800,21600]
	
	// 
	this.levelData =	[
											//Level 1
											[
												["#entity_name","#xpos on screen","#ypos on screen","#extrabitflag"]
											],
											//Level 2
											[
											
											],
										]
										
	this.tick = function () {
		this.position++
		if (this.showProgress) {
			draw.fillStyle = "#F00"
			draw.fillRect(0,0,(this.position / this.levelLengths[this.level])*width,4)
		}
		
		if (this.position == this.levelLengths[this.level]) {
			this.spawnBoss()
		}
	}
	
	this.spawnBoss = function () {
		
	}
}

//File: optionsGui.js

function optionsMenu(y) {

	this.allLabels = ["Scale mode:","Show FPS:","Difficulty:","Back"]
	this.scaleLabels = new Array()
	this.scaleLabels["noscale"] = "No Scale"
	this.scaleLabels["float"] = "Float"
	this.scaleLabels["integer"] = "Integer"
	
	this.fpsLabels = ["☒","☑"]
	
	this.difficultyLabels = [
														"Very Easy",
														"Easy",
														"Difficult",
														"Very Difficult",
														"Hard",
														"Very Hard",
														"Extreme",
														"EXTREME+",
														"Nightmare",
														"HELL"
													]
	
	this.backLabels = [""]
	
	this.values = [this.scaleLabels,this.fpsLabels,this.difficultyLabels,this.backLabels]
	
	this.ignoreInput = 30
	
	this.splitAt = Math.ceil(this.allLabels.length / 2)
	
	ram["difficulty"] = 0
	
	this.x = 0
	this.y = y
	this.minWidth = 0
	this.optionHover = 0
	this.side = 0
	
		this.color = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(16+16*noise)+","+Math.floor(32+32*noise)+","+128+","+(0.5+noise/8)+")"
		return c
	}
	
	this.selectedColor = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(32+16*noise)+","+Math.floor(64+32*noise)+","+255+","+(0.5+noise/8)+")"
		return c
	}
	
	this.textColor = function () {
		var c = "rgba("
		var white = 255-Math.floor(32*Math.random())
		c+=white+","+white+","+white+","+0.75+")"
		return c
	}
	
	// Init code
	draw.font = "16px monospace"
	
	for (var i = 0; i < this.allLabels.length; i++) {
		var w = draw.measureText(this.allLabels[i]).width
		if (w > this.minWidth) {
			this.minWidth = w
		}
	}
	
	this.minWidth += 176
	
	this.draw = function () {
	
		this.interact()
	
		this.optionsFlags = [autoScale,showFPS,ram["difficulty"],0]
		
		var left = this.allLabels.slice(0,this.splitAt)
		var right = this.allLabels.slice(this.splitAt,-1)
		
		for (var i = 0; left.length > i; i++) {
			var selectedPathL = new Path2D()
			selectedPathL.moveTo(this.x-1,this.y+i*64)
			selectedPathL.lineTo(this.x+this.minWidth+128,this.y+i*64)
			selectedPathL.lineTo(this.x+this.minWidth+96,this.y+i*64+48)
			selectedPathL.lineTo(this.x-1,this.y+i*64+48)

			var notSelectedPathL = new Path2D()
			notSelectedPathL.moveTo(this.x-1,this.y+i*64)
			notSelectedPathL.lineTo(this.x+this.minWidth+64,this.y+i*64)
			notSelectedPathL.lineTo(this.x+this.minWidth+32,this.y+i*64+48)
			notSelectedPathL.lineTo(this.x-1,this.y+i*64+48)
			
			var selectedPathR = new Path2D()
			selectedPathR.moveTo(width+1,this.y+i*64)
			selectedPathR.lineTo(width-this.minWidth-128,this.y+i*64)
			selectedPathR.lineTo(width-this.minWidth-96,this.y+i*64+48)
			selectedPathR.lineTo(width+1,this.y+i*64+48)

			var notSelectedPathR = new Path2D()
			notSelectedPathR.moveTo(width+1,this.y+i*64)
			notSelectedPathR.lineTo(width-this.minWidth-64,this.y+i*64)
			notSelectedPathR.lineTo(width-this.minWidth-32,this.y+i*64+48)
			notSelectedPathR.lineTo(width+1,this.y+i*64+48)
			
			var textOffset = 8
		
			var pathL = notSelectedPathL
			var pathR = notSelectedPathR
			draw.fillStyle = this.color()
			
			if (this.optionHover == i && !this.side) {
				draw.fillStyle = this.selectedColor()
				pathL = selectedPathL
			}
			
			draw.fill(pathL)
			draw.stroke(pathL)
			
			if (this.optionHover == i && this.side) {
				draw.fillStyle = this.selectedColor()
				pathR = selectedPathR
			} else {
				draw.fillStyle = this.color()
			}
			
			draw.fill(pathR)
			draw.stroke(pathR)
			
			draw.fillStyle = this.textColor()
			draw.font = "24px monospace"
			
			draw.fillText(this.allLabels[i] + this.values[i][this.optionsFlags[i]],this.x+textOffset,this.y+i*64+32)
			if (this.allLabels[i+this.splitAt] == undefined) {
				continue
			}
			var txt = this.allLabels[i+this.splitAt] + this.values[i+this.splitAt][this.optionsFlags[i+this.splitAt]]
			draw.fillText(txt.trim(),width-draw.measureText(txt).width-textOffset,this.y+i*64+32)
		}
		
		if (this.ignoreInput) {
			this.ignoreInput--
		}
	}
	
	this.interact = function () {
		if (mouse.y > this.y && mouse.y < this.y + this.splitAt*64 && mouse.show) {
			var y = mouse.y - this.y
			this.optionHover = Math.floor(y/64) % this.splitAt
			this.side = mouse.x > width/2
			
			if (mouse.leftClick && this.ignoreInput == 0) {
				this.exec(this.optionHover,this.side,this.splitAt)
				this.ignoreInput = 30
			}
			
			if (mouse.leftClick == false) {
				this.ignoreInput = 0
			}
			
			return true
		}
		this.optionHover = -1
		this.side = -1
	}
	
	this.exec = function (y,x,mult) {
		switch (y+x*mult) {
			case 0:
				switch (autoScale) {
					case "float":
					autoScale="integer"
					break
					
					case "integer":
					autoScale="noscale"
					break
					
					default:
					autoScale="float"
				}
				break
			
			case 1:
				showFPS = Math.abs(showFPS - 1)
				break
				
			case 2:
				ram["difficulty"]++
				if (ram["difficulty"] == 10) {
					ram["difficulty"] = 0
				}
				break
				
			case 3:
				ram["tsmode"] = "title"
				break
			default:
			
		}
	}
	
	/*
	this.interact = function () {
		if (mouse.x < this.minWidth+128+this.x && mouse.y > this.y && mouse.y < this.y + this.optionLabels.length*64 && mouse.show) {
			var y = mouse.y - this.y
			this.optionHover = Math.floor(y/64) % this.optionLabels.length
			return true
		}
		this.optionHover = -1
	}
	*/
}

//File: player.js

function player(x,y) {
	this.x = x // on map x coordinate
	this.y = y // on map y coordinate
	
	this.dx = 0
	this.dy = 0
	
	this.speed = 1
	
	this.dirFrame = 0
	this.engineFlame = 0
	
	this.blocked = [false,false,false,false]
	this.lockControls = false
	
	this.weapon = 0
	this.shield = 0
	this.option = 0
	this.missle = 0
	
	// Hitbox: xOffset,yOffset,width,height
	this.difficultyHitbox = [
														[8,8,2,2],
														[8,8,2,2],
														[7,7,3,3],
														[6,6,4,4],
														[6,6,4,4],
														[6,6,4,4],
														[5,5,5,5],
														[4,4,6,6],
														[3,3,7,7],
														[2,2,8,8],
													]
	this.hitbox = this.difficultyHitbox[ram["difficulty"]]
	
	this.cooldown = 0
	
	this.gfx = new Image()
	this.gfx.src = "img/player.png"
	this.onload = function () {
		player.loaded = true
	}
	
	this.tick = function () {
		
		// Powerups 2 objectData
		
		this.speed = ram["powerups"][0]
		
		
		if (key[controls["accept"]] == false) {
			this.cooldown = 0
		}
	
		this.dx = 0
		this.dy = 0
		if (key[controls["left"]] && this.x > 0) {
			this.dx = -this.speed
			this.engineFlame-=this.speed*2
		}
		
		if (key[controls["right"]] && this.x < width-16) {
			this.dx = this.speed
			this.engineFlame+=this.speed*2
		}
		
		if (key[controls["up"]] && this.y > 0) {
			this.dy = -this.speed
			this.dirFrame-=this.speed*2
		}
		
		if (key[controls["down"]] && this.y < height-16) {
			this.dy = this.speed
			this.dirFrame+=this.speed*2
		}
		
		if (key[controls["accept"]] && this.cooldown <= 0) {
			this.cooldown = Math.floor(32/this.speed)
			
		}

		this.x += this.dx
		this.y += this.dy
		
		this.dirFrame *= 0.9
		this.engineFlame *= 0.9
		
		this.cooldown--
		
		if (this.dirFrame > 48) {
			this.dirFrame = 48
		}
		
		if (this.dirFrame < -48) {
			this.dirFrame = -48
		}
		
		this.draw()
	}

	this.draw = function () {
		
		if (this.dirFrame > -16 && this.dirFrame < 16 ) {
			draw.drawImage(this.gfx,0,0,24,16,this.x,this.y,24,16)
		} else if (this.dirFrame <= -16 && this.dirFrame > -32) {
			draw.drawImage(this.gfx,29,0,24,16,this.x,this.y,24,16)
		} else if (this.dirFrame <= -32) {
			draw.drawImage(this.gfx,55,0,24,16,this.x,this.y,24,16)
		} else if (this.dirFrame >= 16 && this.dirFrame < 32) {
			draw.drawImage(this.gfx,84,0,24,16,this.x,this.y,24,16)
		} else {
			draw.drawImage(this.gfx,110,0,24,16,this.x,this.y,24,16)
		}
		
		draw.beginPath()
		draw.moveTo(this.x-1,this.y+5)
		if (this.engineFlame > -16 && this.engineFlame < 16 ) {
			draw.lineTo(this.x-4,this.y+7)
			draw.lineTo(this.x-1,this.y+9)
		} else if (this.engineFlame <= -16 && this.engineFlame > -32) {
			draw.lineTo(this.x-3,this.y+7)
			draw.lineTo(this.x-1,this.y+8)
		} else if (this.engineFlame <= -32) {
			draw.lineTo(this.x-2,this.y+7)
			draw.lineTo(this.x-1,this.y+8)
		} else if (this.engineFlame >= 16 && this.engineFlame < 32) {
			draw.lineTo(this.x-6,this.y+7)
			draw.lineTo(this.x-1,this.y+8)
		} else {
			draw.lineTo(this.x-8,this.y+7)
			draw.lineTo(this.x-1,this.y+8)
		}
		
		draw.closePath()
		draw.fillStyle = "#24F"
		draw.fill()
		
		// Draw Hitbox
		
		draw.fillStyle = "rgba(255,0,255,0.25)"
		draw.fillRect(this.x+this.hitbox[0],this.y+this.hitbox[1],this.hitbox[2],this.hitbox[3])
		
		/*
		
		draw.fillStyle="#00FF00"
		draw.fillRect(this.x-camera[0],this.y-camera[1],16,16)
		draw.fillStyle="#000000"
		draw.fillText(this.dx,this.x-camera[0],this.y-camera[1])
		draw.fillText(this.dy,this.x-camera[0]+16,this.y-camera[1]+16)
		
		*/
	}
	
}

//File: postprocess.js

function postprocess(type,a) {
	switch (type) {
		case "light":
			var screenshot = draw.getImageData(0,0,width,height)
			var boisterousCoconut = screenshot.data.length
			
			for (var i = 0; boisterousCoconut > i; i+=16) {
				var r = screenshot.data[i]
				var g = screenshot.data[i+1]
				var b = screenshot.data[i+2]
				
				var x = i%width
				var y = (i-x)%height
				
				draw.fillStyle = "rgba("+r+","+g+","+b+",0.125)"
				draw.fillRect(x-a/2,y-a/2,a,a)
			}
			
			break
		default:
		
	}
}

//File: projectiles.js

function projectiles () {
	
	this.stack = []
	
	
}

//File: spawner.js

function spawnerEngine () {
	
	this.entity = function (id, x, y, extrabit) {
		
	}
}

//File: spriteTemplate.js

function templateSprite() {
	this.x = 1 // on map x coordinate
	this.y = 1 // on map y coordinate
	this.imgXoffset = 0 // x offset of graphics in allgfx.png
	this.imgYoffset = 0 // y offset of graphics in allgfx.png
	this.imgWidth = 16	// how wide one frame is
	this.imgHeight = 16	// how hight one frame is
	this.spriteMapX = [0] // x coordinates of sprite relative to imgXoffset, use this for animation states
	this.spriteMapY = [0]	// y coordinates of sprite relative to imgYoffset, use this for animation states
	this.spriteDisplay = 0	// which animation state to show
		
	// DEBUG STUFF, PUT CODE HERE, AND SET >debug = true< TO SEE DEBUG STUFF YOU'VE CODED!
	this.debug = function () {
		// Example: draw semi-transparent rectangle for imgWidth+imgHeight with correct scale
		draw.scale(scale,scale)
		draw.fillStyle = "rgba(0,0,0,0.125)"
		draw.fillRect((this.x-camera[0])*scale,(this.y-camera[1])*scale,this.imgWidth,this.imgHeight)
		draw.scale(1,1)
	}
	
	this.draw = function () {
		draw.sprite(this)
	}
	
	this.tick = function () {
	
	}
}

//File: starfield.js

function starfield(count,layers) {
	this.starlayers = []
	this.count = count
	this.layersCount = layers
	this.layerSpeed = [3,2,1,0.66,0.33,0.25,0.125,0.0625]
	this.layerX = []
	for (var i = 0; i < layers; i++) {
		this.starlayers.push(document.createElement("canvas"))
		this.starlayers[i].width = width
		this.starlayers[i].height = height
		for (var j = 0; j < count; j++) {
			var d = this.starlayers[i].getContext("2d")
			var x = Math.floor(Math.random() * width)
			var y = Math.floor(Math.random() * height)
			var s = 1 + Math.random() * 4
			var b = Math.random() * 64
			var c = "rgb(" + (128+Math.floor(b)) + "," + (128+Math.floor(b)) + "," + (224+Math.floor(b/2)) + ")"
			
			d.moveTo(x,y)
			d.quadraticCurveTo(x,y+s,x+s,y+s)
			d.quadraticCurveTo(x,y+s,x,y+s*2)
			d.quadraticCurveTo(x,y+s,x-s,y+s)
			d.quadraticCurveTo(x,y+s,x,y)
			d.fillStyle = c
			d.fill()
		}
		this.layerX[i] = 0
	}
	
	this.draw = function () {
		for (var i = 0; i < this.layersCount; i++)  {
			this.layerX[i] -= this.layerSpeed[i]
			if (this.layerX[i] < 0) {
				this.layerX[i] = width
			}
			var x = this.starlayers[i]
			draw.drawImage(x,this.layerX[i],0)
			draw.drawImage(x,this.layerX[i]-width,0)
			
		}
	}
}

//File: textbox.js

function textboxEngine (str, type, arg0) {
	this.text = str
	this.type = type
	this.arg0 = arg0
	
	this.color = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(16+16*noise)+","+Math.floor(32+32*noise)+","+128+","+(0.5+noise/8)+")"
		return c
	}
	
	this.textColor = function () {
		var c = "rgba("
		var white = 255-Math.floor(32*Math.random())
		c+=white+","+white+","+white+","+0.75+")"
		return c
	}
	
	this.draw = function () {
		draw.save()
		switch (this.type) {
			case "floating":
				this.arg0[0] += this.arg0[2]
				this.arg0[1] += this.arg0[3]
				
				var x = this.arg0[0]
				var y = this.arg0[1]
				var w = draw.measureText(this.text).width+64
				
				draw.fillStyle = this.color()
				draw.strokeStyle = "rgba(0,0,0,0.25)"
				draw.font = "24px monospace"				
				
				draw.beginPath()
				
				draw.moveTo(x-w/2-32,y-16)
				draw.lineTo(x+w/2,y-16)
				draw.lineTo(x+w/2+32,y+16)
				draw.lineTo(x-w/2,y+16)
				draw.closePath()
				
				draw.fill()
				draw.stroke()
				
				draw.fillStyle = this.textColor()
				draw.textAlign = "center"
				draw.textBaseline = "middle"
				draw.fillText(this.text,x,y)
				
			default:
			
		}
		draw.restore()
	}
}

//File: titlescreenGui.js

function titlescreenMenu(optionLabels,x,y) {
	this.optionLabels = optionLabels
	this.x = x
	this.y = y
	this.minWidth = 0
	this.optionHover = 0
	
	
	
	this.color = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(16+16*noise)+","+Math.floor(32+32*noise)+","+128+","+(0.5+noise/8)+")"
		return c
	}
	this.selectedColor = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(32+16*noise)+","+Math.floor(64+32*noise)+","+255+","+(0.5+noise/8)+")"
		return c
	}
	
	this.textColor = function () {
		var c = "rgba("
		var white = 255-Math.floor(32*Math.random())
		c+=white+","+white+","+white+","+0.75+")"
		return c
	}
	
	// Init code
	draw.font = "32px monospace"
	for (var i = 0; i < this.optionLabels.length; i++) {
		var w = draw.measureText(this.optionLabels[i]).width
		if (w > this.minWidth) {
			this.minWidth = w
		}
	}
	
	// Draw the interface
	
	this.draw = function () {
		
		draw.save()
		draw.shadowColor = "rgba(0,0,0,0.25)"
		draw.shadowOffsetX = 2
		draw.shadowOffsetY = 2
		
		this.interact()
				
		for (var i = 0; this.optionLabels.length > i; i++) {
			
			var selectedPath = new Path2D()
			selectedPath.moveTo(this.x-1,this.y+i*64)
			selectedPath.lineTo(this.x+this.minWidth+128,this.y+i*64)
			selectedPath.lineTo(this.x+this.minWidth+96,this.y+i*64+48)
			selectedPath.lineTo(this.x-1,this.y+i*64+48)

			var notSelectedPath = new Path2D()
			notSelectedPath.moveTo(this.x-1,this.y+i*64)
			notSelectedPath.lineTo(this.x+this.minWidth+64,this.y+i*64)
			notSelectedPath.lineTo(this.x+this.minWidth+32,this.y+i*64+48)
			notSelectedPath.lineTo(this.x-1,this.y+i*64+48)
		
			var textOffset = 8
		
			var path = notSelectedPath
			draw.fillStyle = this.color()
			if (this.optionHover == i) {
				path = selectedPath
				draw.fillStyle = this.selectedColor()
				textOffset = 32
			}

			draw.strokeStyle = "#000"

			draw.fill(path)
			draw.stroke(path)
			
			draw.fillStyle = this.textColor()
			draw.font = "32px monospace"
			
			draw.fillText(this.optionLabels[i],this.x+textOffset,this.y+i*64+32)
			
		}
		
		// Draw credits
		
		draw.beginPath()
		draw.moveTo(width+1,300)
		draw.lineTo(width-(this.minWidth+128),300)
		draw.lineTo(width-(this.minWidth+32),412)
		draw.lineTo(width+1,476)
		draw.closePath()
		draw.fillStyle = this.color()
		draw.strokeStyle = "#000"
		draw.fill()
		draw.stroke()
		draw.fillStyle = this.textColor()
		draw.font = "24px monospace"
		draw.fillText("Credits",width - draw.measureText("Credits").width - 16,324)
		draw.fillText("Code, Art, Music",width - draw.measureText("Code, Art, Music").width - 16,363)
		draw.fillText("W4mp3",width - draw.measureText("W4mp3").width - 16,402)
		draw.restore()
	}
	
	this.interact = function () {
		if (mouse.x < this.minWidth+128+this.x && mouse.y > this.y && mouse.y < this.y + this.optionLabels.length*64 && mouse.show) {
			var y = mouse.y - this.y
			this.optionHover = Math.floor(y/64) % this.optionLabels.length
			if (mouse.leftClick) {
				switch (this.optionHover) {
					case 1:
						ram["tsmode"]="option"
						break
					case 0:
						ram["phase"] = 1
						gamemode++
					default:
				}
			}
			
			return true
		}
		this.optionHover = -1
	}
}

