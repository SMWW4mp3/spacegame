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