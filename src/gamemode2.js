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