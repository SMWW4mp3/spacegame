function drawGrid() {
	this.debug = function () {
	
	}
	
	this.draw = function () {
		var tempImg = new Image()
		tempImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC41ZYUyZQAAACtJREFUOE9j+I8DNOAAoxqQAVQeA5CuAUpjAKg+DDCqARlA5TEAiRr+/wcA6pE+nyxJC/UAAAAASUVORK5CYII="

		var pattern = draw.createPattern(tempImg,'repeat')
		draw.scale(scale,scale)
		draw.fillStyle = pattern
		draw.fillRect(0-camera[0]%16,0-camera[1]%16,width+16,height+16)
		draw.scale(1,1)

	}
	
	this.tick = function () {
	
	}
}