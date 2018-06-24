function mapEngine(mapID,entrance) {
	if (entrance == undefined) {
		entrance = -1
	}
	this.entrance = entrance
	this.gfx = []
	this.gfxIndex = []
	this.gfxInfo = []
	this.mapId = mapID
	this.gfxLoaded = false
	
	this.loader = function (mapID) {
		var ajax = new XMLHttpRequest()
		ajax.open("GET","map/"+mapID+".json")
		ajax.send(null)
		ajax.onreadystatechange = function () {
			if (ajax.status == 200 && ajax.readyState == 4) {
				map.json = JSON.parse(ajax.responseText)
				map.parse()
			}
		}
	}
	
	
	this.draw = function () {
		if (this.gfxLoaded == false) {
			var gfxLoaded = 0
			for (var gfx = 0;gfx < this.gfx.length; gfx++) {
				if (this.gfx[gfx].complete) {
					gfxLoaded++
				}
			}
			if (gfxLoaded == this.gfx.length) {
				this.gfxLoaded = true
				console.log("Graphics loaded")
			}
			return true
		}
		
		
		for (var l = 0; l < this.json.layers.length; l++) {
			var layer = this.json.layers[l]
			if (layer.type == "tilelayer" && layer.visible) {
				this.drawTilelayer(layer)
			}
		}
		
		//console.log(layerData)
	}
	
	this.tileInteraction = function (obj) {
		console.log(this)
		var objectX = Math.round(obj.x/this.json.tilewidth)
		var objectY = Math.round(obj.y/this.json.tileheight)
	
		var tileIDinside = this.json.layers[0].data[objectX+objectY*this.json.width]
	
		//Object inside
		
		//Object below
		
		//Object right
		
		//Object left
		
		//Object top
		
	}
	
	this.animatedTile = function(animatedFrames) {
		// NI
	}
	
	this.parse = function () {
	
		// Camera max position
		
		camera[3] = map.json.width*map.json.tilewidth
		camera[4] = map.json.height*map.json.tileheight
		
		// Player startposition
		
		if (map.entrance == -1) {
			console.log("AAAAAAAAA HELP, SOMETHING WENT WRONG, MY CREATOR IS A DOUCHE AND IS NOT ABLE TO PUT A ENTRANCE OBJECT INTO THE LEVEL :(")
			player.x = 128
			player.y = 128
		}

		// Loading tilemap images and push their index onto a stack so we can render multiple Tilesets
		
		for(var i = 0; map.json.tilesets.length > i; i++) {
			var ts = map.json.tilesets[i]
			map.gfx[i] = new Image()
			map.gfx[i].src = ts.image.replace("../","")
			map.gfxIndex.push(ts.firstgid)
			map.gfxInfo.push([Math.floor(ts.imagewidth/ts.tilewidth),Math.floor(ts.imageheight/ts.tileheight)])
		}
	}
	
	this.drawTilelayer = function (layer) {
		
		var w = layer.width
		var h = layer.height
		
		var tileHeight = 16
		var tileWidth = 16
		
		var camX = camera[0]
		var camY = camera[1]
		
		var camXoffset = Math.floor(camX/tileWidth)-1
		var camYoffset = Math.floor(camY/tileHeight)-1
		
		var layerData = layer.data
		
		for (var y = camYoffset; y < h; y++) {
			for (var x = camXoffset; x < w; x++) {
				var currentTile = layerData[x+y*w]
				if (currentTile > 0) {
					var useGFX = -1
					for(var gfxID = 0; gfxID < this.gfx.length; gfxID++) {
						if (currentTile >= this.gfxIndex[gfxID]) {
								useGFX = gfxID
						}
					}
					if (useGFX == -1) {
						alert("GFX Error")
						return true
					}
					var tileToDraw = currentTile-this.gfxIndex[useGFX]
					var tsWidth = this.gfxInfo[useGFX][0]
					var tsHeight = this.gfxInfo[useGFX][1]
					draw.drawImage(this.gfx[useGFX],(tileWidth+1)*(tileToDraw%tsWidth),Math.floor((tileToDraw-(tileToDraw%tsWidth))/tsHeight)*(tileHeight+1),tileWidth,tileHeight,x*tileWidth-camX,y*tileHeight-camY,tileWidth,tileHeight)
					
					
					//draw.drawImage(gfx[0],(tileWidth+spacing)*(currentTile%gfxWidth),Math.floor(currentTile/gfxWidth)*(tileHeight+spacing),tileWidth,tileHeight,x*tileWidth-camX,y*tileHeight-camY,tileWidth,tileHeight)
				}
			}
		}
		
		// Draw player, if he is on that layer
		//console.log(layer.properties)
		if (layer.properties != undefined) {
			player.draw()
		}
	}
	
	this.drawPlayer = function () {
		player.draw()
	}
	
	this.loader(mapID)
	
}