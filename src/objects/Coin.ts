/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description	 Coin game item
 * @license      CatOstrovsky
 */
import { Level } from '../scenes/Level'
import { TiledObject } from '../classes/Interfaces'

export default class Coin extends Phaser.Physics.Arcade.Sprite {

	constructor(public scene: Level, public x: number = 100, public y: number = 500) {
		super(scene, x, y, `coin`)
		scene.physics.world.enable(this)
		this.scene.add.existing(this)
		this.setSize(35,50)
		this.setMaxVelocity(0,0)
		this.setScale(.35).anims.play('coin@normal')

	}

	/**
	 * create Array coins(called in level). Mehod is helper for create objects from tilesprite
	 * @param  {Level}         scene   
	 * @param  {TiledObject[]} objects 
	 * @return {Coin[]}                
	 */
	public static DrawCoins(scene: Level, objects: TiledObject[]) : Coin[] {
		let coins: Coin[] = [];
		for(let object of objects) {
			coins.push(new Coin(scene, object.x, object.y));
		}
		return coins;
	}

}