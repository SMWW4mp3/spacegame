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