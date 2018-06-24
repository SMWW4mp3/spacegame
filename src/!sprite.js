draw.sprite = function(object) {
	// Draw Sprite only if it is in visibile canvas
	if (
			object.x >= camera[0] - object.imgWidth - 1 &&
			object.x <= camera[0] + object.imgWidth + res[0] &&
			object.y >= camera[1] - object.imgHeight - 1 &&
			object.y <= camera[1] + res[1] + object.imgHeight
			) {
		draw.drawImage(
										object.gfx,
										object.imgXoffset+object.spriteMapX[object.spriteDisplay],
										object.imgYoffset+object.spriteMapY[object.spriteDisplay],
										object.imgWidth,
										object.imgHeight,
										(object.x-camera[0]),
										(object.y-camera[1]),
										object.imgWidth,
										object.imgHeight
									)
	}
}