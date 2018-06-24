function mouseEngine() {
	this.x = -9001
	this.y = -9001
	this.gfx = "img/mouse.png"
	var temp = document.getElementById("draw").getBoundingClientRect()
	this.canvasXoffset = temp.left
	this.canvasYoffset = temp.top
	this.state = 1
	this.show = 0
	this.leftClick = false
	this.draw = function () {
		if (this.show != 0 && this.loaded) {
			draw.drawImage(gfx["mouse"],0,16*this.state,16,15,this.x,this.y,16,15)
			draw.save()
			draw.font = "8px courier"
			draw.fillStyle="#FFFFFF"
			draw.shadowColor="#000000"
			draw.shadowBlur = 1
			draw.fillText(this.x+"|"+this.y,this.x+16,this.y+16)
			draw.fillText((this.x+camera[0])+"|"+(this.y+camera[1]),this.x+16,this.y+24)
			draw.fillText("LMB: "+this.leftClick,this.x+16,this.y+32)
			draw.restore()
			this.show--
		}
	}
	
	document.getElementById("draw").addEventListener('mousemove', function (e) {
		var temp = document.getElementById("draw").getBoundingClientRect()
		mouse.canvasXoffset = temp.left
		mouse.canvasYoffset = temp.top
		mouse.show = hideMouseTime
		mouse.x = Math.floor((e.clientX-mouse.canvasXoffset)/scale)
		mouse.y = Math.floor((e.clientY-mouse.canvasYoffset)/scale)
		mouse.draw()
	})
	
	document.getElementById("draw").addEventListener('mousedown', function (e) {
		mouse.leftClick = true
	})
	document.getElementById("draw").addEventListener('mouseup', function (e) {
		mouse.leftClick = false
	})
	document.getElementById("draw").addEventListener('mouseout', function (e) {
		mouse.show = 0
		mouse.leftClick = false
	})
	
	gfx["mouse"] = new Image()
	gfx["mouse"].src = this.gfx
	gfx["mouse"].onload = function () {
		mouse.loaded = true
	}
}