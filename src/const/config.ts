import "phaser";

// Game config : GameConfig
const config = {
	width: 800,
	height: 400,
	title: "TS Phaser3",
	url: "https://example.com",
	version: "1.0",
	zoom: 1,
	type: Phaser.AUTO,
	parent: "game",
	input: {
		keyboard: true,
		mouse: true,
		touch: true,
		gamepad: false
	},
	backgroundColor: "#82b6ff"
}

export default config;