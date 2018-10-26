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
			"name": "Загадочная долина 1",
			"tileName": "level_1",
			"key": "1"
		},
		"2": {
			"image":	"level_1@preview",
			"name": "Загадочная долина 2",
			"tileName": "level_1",
			"key": "2"
		},
		"3": {
			"image":	"level_1@preview",
			"name": "Загадочная долина 3",
			"tileName": "level_1",
			"key": "3"
		},
		"4": {
			"image":	"level_1@preview",
			"name": "Загадочная долина 4",
			"tileName": "level_1",
			"key": "4"
		}
	}
}
