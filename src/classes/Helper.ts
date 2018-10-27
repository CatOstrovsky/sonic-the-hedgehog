import { Level } from '../scenes/Level'
import Config from '../const/config'
/**
 * In classes folder you can create Managers and helpers for you game
 */
export default class Helper {

	static heroes:{ [key: string] : { [name:string] : string } } = {
		"sm": {
			"name":	"sm",
			"key": "sm"
		},
		"sonic": {
			"name":	"sonic",
			"key": "sonic"
		},
		"knukles": {
			"name":	"knukles",
			"key": "knukles"
		}
	}

	static levels:{ [key: string] : { [name:string] : string } } = {
		"1": {
			"image":	"level_1@preview",
			"name": "Быстрый старт",
			"tileName": "level_1",
			"key": "1"
		},
		"2": {
			"image":	"level_1@preview",
			"name": "Высокие холмы",
			"tileName": "level_2",
			"key": "2"
		},
		"3": {
			"image":	"level_1@preview",
			"name": "Далекие дистанции",
			"tileName": "level_3",
			"key": "3"
		},
		"4": {
			"image":	"level_1@preview",
			"name": "Загадочная долина",
			"tileName": "level_4",
			"key": "4"
		}
	}

	static makeSalut(scene: Level) {
		for (var i = 100; i >= 0; i--) {
			setTimeout(() => {
				let s = scene.physics.add.image(Config.width/2, Config.height, 'elements', 'star.png')
				.setVelocity( (300 * Math.random()) * ((Math.random() > .5) ? 1 : -1), (1000 * Math.random()) * -1 )
				.setScrollFactor(0,0);

				setTimeout(() => {
					s.destroy();
				}, 1500)

			}, (1000 * Math.random()))
		}
	}
}
