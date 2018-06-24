function textboxEngine (str, type, arg0) {
	this.text = str
	this.type = type
	this.arg0 = arg0
	
	this.color = function() {
		var c = "rgba("
		var noise = Math.random()/4
		c+=Math.floor(16+16*noise)+","+Math.floor(32+32*noise)+","+128+","+(0.5+noise/8)+")"
		return c
	}
	
	this.textColor = function () {
		var c = "rgba("
		var white = 255-Math.floor(32*Math.random())
		c+=white+","+white+","+white+","+0.75+")"
		return c
	}
	
	this.draw = function () {
		draw.save()
		switch (this.type) {
			case "floating":
				this.arg0[0] += this.arg0[2]
				this.arg0[1] += this.arg0[3]
				
				var x = this.arg0[0]
				var y = this.arg0[1]
				var w = draw.measureText(this.text).width+64
				
				draw.fillStyle = this.color()
				draw.strokeStyle = "rgba(0,0,0,0.25)"
				draw.font = "24px monospace"				
				
				draw.beginPath()
				
				draw.moveTo(x-w/2-32,y-16)
				draw.lineTo(x+w/2,y-16)
				draw.lineTo(x+w/2+32,y+16)
				draw.lineTo(x-w/2,y+16)
				draw.closePath()
				
				draw.fill()
				draw.stroke()
				
				draw.fillStyle = this.textColor()
				draw.textAlign = "center"
				draw.textBaseline = "middle"
				draw.fillText(this.text,x,y)
				
			default:
			
		}
		draw.restore()
	}
}