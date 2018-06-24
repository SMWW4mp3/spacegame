function hdmaGradient(h) {
	if (arguments.length <= 1) {
		return "#FF00FF"
	}
	if (arguments.length == 2) {
		var temp = arguments[1].split(";")
		return temp[1]
	}
	newBGColor = draw.createLinearGradient(0,0,0,height)
	for (var i = 1; i < arguments.length; i++) {
		var temp = arguments[i].split(";")
		newBGColor.addColorStop(temp[0],temp[1])
	}

	return newBGColor
}