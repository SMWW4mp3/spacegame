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