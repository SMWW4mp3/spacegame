function starfield(count,layers) {
	this.starlayers = []
	this.count = count
	this.layersCount = layers
	this.layerSpeed = [3,2,1,0.66,0.33,0.25,0.125,0.0625]
	this.layerX = []
	for (var i = 0; i < layers; i++) {
		this.starlayers.push(document.createElement("canvas"))
		this.starlayers[i].width = width
		this.starlayers[i].height = height
		for (var j = 0; j < count; j++) {
			var d = this.starlayers[i].getContext("2d")
			var x = Math.floor(Math.random() * width)
			var y = Math.floor(Math.random() * height)
			var s = 1 + Math.random() * 4
			var b = Math.random() * 64
			var c = "rgb(" + (128+Math.floor(b)) + "," + (128+Math.floor(b)) + "," + (224+Math.floor(b/2)) + ")"
			
			d.moveTo(x,y)
			d.quadraticCurveTo(x,y+s,x+s,y+s)
			d.quadraticCurveTo(x,y+s,x,y+s*2)
			d.quadraticCurveTo(x,y+s,x-s,y+s)
			d.quadraticCurveTo(x,y+s,x,y)
			d.fillStyle = c
			d.fill()
		}
		this.layerX[i] = 0
	}
	
	this.draw = function () {
		for (var i = 0; i < this.layersCount; i++)  {
			this.layerX[i] -= this.layerSpeed[i]
			if (this.layerX[i] < 0) {
				this.layerX[i] = width
			}
			var x = this.starlayers[i]
			draw.drawImage(x,this.layerX[i],0)
			draw.drawImage(x,this.layerX[i]-width,0)
			
		}
	}
}