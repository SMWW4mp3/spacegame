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