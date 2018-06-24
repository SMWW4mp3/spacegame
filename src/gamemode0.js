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