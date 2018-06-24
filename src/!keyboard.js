function keyboardEngine() {
	onkeydown = onkeyup = function(e){
		e = e || event; // to deal with IE
		
		
		
		key[e.keyCode] = e.type == 'keydown';
		
		
		
		
		
		if (key[controls["showBuild"]]) {
			showBuildVersion = Math.abs(showBuildVersion - 1)
		}
		
		if (key[controls["showFPS"]]) {
			showFPS = Math.abs(showFPS - 1)
		}
		
		if (key[controls["scaleMode"]]) {
			switch (autoScale) {
				case "float":
				autoScale="integer"
				break
				
				case "integer":
				autoScale="noscale"
				break
				
				default:
				autoScale = "float"
			}
			console.log(autoScale)
			e.preventDefault()
		}
		
	}
}