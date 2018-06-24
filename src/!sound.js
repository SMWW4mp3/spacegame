function soundEngine() {
	this.container = document.getElementById("sfxcontainer")
	this.sfxlibrary = []
	this.musicStack = []
	this.currentMusic = ""
	this.volume = 100
	this.isFade = false
	this.fadeSpeed = 0
	this.side = "L"
	this.nextSong = ""
	this.playSFX = function (sfx, vol, pan) {
		this.container.innerHTML = "<audio autoplay><source src=\""+sfx+"\" type=\"audio/ogg\"></audio>"
	}
	this.playMusic = function(track,fade) {
		
		
	}
	this.load = function (filename,type) {
	}
}