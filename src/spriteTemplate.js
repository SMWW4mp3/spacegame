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