function guiEngine(drawBox,listOfItems,x,y,backgroundColor) {
	this.menu = listOfItems
	this.x = x
	this.y = y
	this.bg = backgroundColor
	this.drawBox = drawBox
	this.init = false
	this.lineHover = 0
	this.draw = function () {
		if (this.init == 2) {
			var tempX = this.x
			var tempY = this.y
			var longestOption = -1
			for (var line = 0; line < this.menu.length; line++) {
				if (longestOption <= this.menu[line].length) {
					longestOption = this.menu[line].length
				}
			}
			
			if (this.drawBox == "full") {
				this.x = 0
				
				
				
				this.y += 16
				this.x = 32
			}
			if (this.drawBox == "fit") {
				draw.fillStyle = this.bg
				draw.fillRect(this.x,this.y,(longestOption+2)*16,(this.menu.length+1)*16)
				for (var i = 0; i < longestOption+2; i++) {
					draw.drawImage(gfx["gui"],16,0,16,16,i*16+this.x,this.y,16,16)
					draw.drawImage(gfx["gui"],16,0,16,16,i*16+this.x,this.y+(16)+this.menu.length*16,16,16)
				}
				for (var i = 0; i < this.menu.length+2; i++) {
					draw.drawImage(gfx["gui"],0,16,16,16,this.x,this.y+i*16,16,16)
					draw.drawImage(gfx["gui"],0,16,16,16,this.x+(longestOption+2)*16,this.y+(i*16),16,16)
				}
				
				draw.drawImage(gfx["gui"],0,0,16,16,this.x,this.y,16,16)
				draw.drawImage(gfx["gui"],32,0,16,16,this.x+(longestOption+2)*16,this.y,16,16)
				draw.drawImage(gfx["gui"],0,32,16,16,this.x,this.y+(this.menu.length+1)*16,16,16)
				draw.drawImage(gfx["gui"],32,32,16,16,this.x+(longestOption+2)*16,this.y+(this.menu.length+1)*16,16,16)
				
				this.y += 16
				this.x += 32
			}
		
			for (var line = 0; line < this.menu.length; line++) {
				var temp = this.menu[line]
				for(var i = 0; temp.length > i; i++) {
					var charPos = temp.charCodeAt(i)
					var charPosCol = charPos % 16
					var charPosRow = (charPos-charPosCol)/16
					draw.drawImage(gfx["font"],charPosCol*16,charPosRow*16,16,16,i*16+this.x,this.y+line*16,16,16)
				}
				if (this.lineHover == line) {
					draw.drawImage(gfx["font"],144,144,16,16,this.x-16,this.y+line*16,16,16)
				}
			}
			this.x = tempX
			this.y = tempY
		}
	}
	
	this.interact  = function () {
		var longestOption = -1
		for (var line = 0; line < this.menu.length; line++) {
			if (longestOption <= this.menu[line].length) {
				longestOption = this.menu[line].length
			}
		}
		if (
				mouse.y >= this.y + 16 &&
				mouse.y <= this.y + this.menu.length * 16 + 15 &&
				mouse.x >= this.x &&
				mouse.x <= this.x+longestOption*16+32
			) {
			var option = Math.floor(( mouse.y - this.y)/16)-1
			this.lineHover = option
		}
		if (key[controls["up"]]) {
			this.lineHover--
			if (this.lineHover < 0) {
				this.lineHover = this.menu.length-1
			}
		}
		if (key[controls["down"]]) {
			this.lineHover++
			if (this.lineHover == this.menu.length) {
				this.lineHover = 0
			}
		}
		
		
	}
	
	gfx["font"] = new Image()
	gfx["font"].src = "img/font.png"
	gfx["font"].onload = function () {
		gui.init++
	}
	gfx["gui"] = new Image()
	gfx["gui"].src = "img/gui.png"
	gfx["gui"].onload = function () {
		gui.init++
	}
}