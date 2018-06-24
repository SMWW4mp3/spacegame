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