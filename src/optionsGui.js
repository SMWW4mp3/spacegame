function optionsMenu(y) {

	this.allLabels = ["Scale mode:","Show FPS:","Difficulty:","Back"]
	this.scaleLabels = new Array()
	this.scaleLabels["noscale"] = "No Scale"
	this.scaleLabels["float"] = "Float"
	this.scaleLabels["integer"] = "Integer"
	
	this.fpsLabels = ["☒","☑"]
	
	this.difficultyLabels = [
														"Very Easy",
														"Easy",
														"Difficult",
														"Very Difficult",
														"Hard",
														"Very Hard",
														"Extreme",
														"EXTREME+",
														"Nightmare",
														"HELL"
													]
	
	this.backLabels = [""]
	
	this.values = [this.scaleLabels,this.fpsLabels,this.difficultyLabels,this.backLabels]
	
	this.ignoreInput = 30
	
	this.splitAt = Math.ceil(this.allLabels.length / 2)
	
	ram["difficulty"] = 0
	
	this.x = 0
	this.y = y
	this.minWidth = 0
	this.optionHover = 0
	this.side = 0
	
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
	draw.font = "16px monospace"
	
	for (var i = 0; i < this.allLabels.length; i++) {
		var w = draw.measureText(this.allLabels[i]).width
		if (w > this.minWidth) {
			this.minWidth = w
		}
	}
	
	this.minWidth += 176
	
	this.draw = function () {
	
		this.interact()
	
		this.optionsFlags = [autoScale,showFPS,ram["difficulty"],0]
		
		var left = this.allLabels.slice(0,this.splitAt)
		var right = this.allLabels.slice(this.splitAt,-1)
		
		for (var i = 0; left.length > i; i++) {
			var selectedPathL = new Path2D()
			selectedPathL.moveTo(this.x-1,this.y+i*64)
			selectedPathL.lineTo(this.x+this.minWidth+128,this.y+i*64)
			selectedPathL.lineTo(this.x+this.minWidth+96,this.y+i*64+48)
			selectedPathL.lineTo(this.x-1,this.y+i*64+48)

			var notSelectedPathL = new Path2D()
			notSelectedPathL.moveTo(this.x-1,this.y+i*64)
			notSelectedPathL.lineTo(this.x+this.minWidth+64,this.y+i*64)
			notSelectedPathL.lineTo(this.x+this.minWidth+32,this.y+i*64+48)
			notSelectedPathL.lineTo(this.x-1,this.y+i*64+48)
			
			var selectedPathR = new Path2D()
			selectedPathR.moveTo(width+1,this.y+i*64)
			selectedPathR.lineTo(width-this.minWidth-128,this.y+i*64)
			selectedPathR.lineTo(width-this.minWidth-96,this.y+i*64+48)
			selectedPathR.lineTo(width+1,this.y+i*64+48)

			var notSelectedPathR = new Path2D()
			notSelectedPathR.moveTo(width+1,this.y+i*64)
			notSelectedPathR.lineTo(width-this.minWidth-64,this.y+i*64)
			notSelectedPathR.lineTo(width-this.minWidth-32,this.y+i*64+48)
			notSelectedPathR.lineTo(width+1,this.y+i*64+48)
			
			var textOffset = 8
		
			var pathL = notSelectedPathL
			var pathR = notSelectedPathR
			draw.fillStyle = this.color()
			
			if (this.optionHover == i && !this.side) {
				draw.fillStyle = this.selectedColor()
				pathL = selectedPathL
			}
			
			draw.fill(pathL)
			draw.stroke(pathL)
			
			if (this.optionHover == i && this.side) {
				draw.fillStyle = this.selectedColor()
				pathR = selectedPathR
			} else {
				draw.fillStyle = this.color()
			}
			
			draw.fill(pathR)
			draw.stroke(pathR)
			
			draw.fillStyle = this.textColor()
			draw.font = "24px monospace"
			
			draw.fillText(this.allLabels[i] + this.values[i][this.optionsFlags[i]],this.x+textOffset,this.y+i*64+32)
			if (this.allLabels[i+this.splitAt] == undefined) {
				continue
			}
			var txt = this.allLabels[i+this.splitAt] + this.values[i+this.splitAt][this.optionsFlags[i+this.splitAt]]
			draw.fillText(txt.trim(),width-draw.measureText(txt).width-textOffset,this.y+i*64+32)
		}
		
		if (this.ignoreInput) {
			this.ignoreInput--
		}
	}
	
	this.interact = function () {
		if (mouse.y > this.y && mouse.y < this.y + this.splitAt*64 && mouse.show) {
			var y = mouse.y - this.y
			this.optionHover = Math.floor(y/64) % this.splitAt
			this.side = mouse.x > width/2
			
			if (mouse.leftClick && this.ignoreInput == 0) {
				this.exec(this.optionHover,this.side,this.splitAt)
				this.ignoreInput = 30
			}
			
			if (mouse.leftClick == false) {
				this.ignoreInput = 0
			}
			
			return true
		}
		this.optionHover = -1
		this.side = -1
	}
	
	this.exec = function (y,x,mult) {
		switch (y+x*mult) {
			case 0:
				switch (autoScale) {
					case "float":
					autoScale="integer"
					break
					
					case "integer":
					autoScale="noscale"
					break
					
					default:
					autoScale="float"
				}
				break
			
			case 1:
				showFPS = Math.abs(showFPS - 1)
				break
				
			case 2:
				ram["difficulty"]++
				if (ram["difficulty"] == 10) {
					ram["difficulty"] = 0
				}
				break
				
			case 3:
				ram["tsmode"] = "title"
				break
			default:
			
		}
	}
	
	/*
	this.interact = function () {
		if (mouse.x < this.minWidth+128+this.x && mouse.y > this.y && mouse.y < this.y + this.optionLabels.length*64 && mouse.show) {
			var y = mouse.y - this.y
			this.optionHover = Math.floor(y/64) % this.optionLabels.length
			return true
		}
		this.optionHover = -1
	}
	*/
}