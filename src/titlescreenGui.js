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