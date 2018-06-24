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