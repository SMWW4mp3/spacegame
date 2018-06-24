function showBuild() {
	if (showBuildVersion) {
		draw.font = "14px Arial"
		var x = draw.measureText(build + " | Frame: " + ram["frames"])
		draw.fillStyle = "rgba(0,0,0,0.5)"
		draw.fillRect(0,height-16,x.width + 16,16)
		draw.fillStyle = "#FFFFFF"
		draw.fillText((build + " | Frame: " + ram["frames"]),8,height-3)
	}
}