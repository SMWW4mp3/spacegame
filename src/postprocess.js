function postprocess(type,a) {
	switch (type) {
		case "light":
			var screenshot = draw.getImageData(0,0,width,height)
			var boisterousCoconut = screenshot.data.length
			
			for (var i = 0; boisterousCoconut > i; i+=16) {
				var r = screenshot.data[i]
				var g = screenshot.data[i+1]
				var b = screenshot.data[i+2]
				
				var x = i%width
				var y = (i-x)%height
				
				draw.fillStyle = "rgba("+r+","+g+","+b+",0.125)"
				draw.fillRect(x-a/2,y-a/2,a,a)
			}
			
			break
		default:
		
	}
}