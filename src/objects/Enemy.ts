/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import { Level } from '../scenes/Level'
import { TiledObject } from '../classes/Interfaces'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

	private _spawnPosition:Phaser.Math.Vector2 = new Phaser.Math.Vector2();
	private _agrDistance:number = 200;
	private _spawnDistance:number = 190;
	private _speed:number = 100;
	private _returnSpeed:number = 50;

	constructor(public scene: Level, public x: number = 100, public y: number = 500, type:number|string = 1) {
		super(scene, x, y, 'enemies', `${type}/sprite_${type}.png`)
		scene.physics.world.enable(this)
		this.scene.add.existing(this)
		
		this._spawnPosition.setFromObject({ x, y });

		this.anims.play(`enemy_${type}@normal`);

		scene.physics.add.collider(this, scene.layer)
	}

	public static DrawEnemies(scene: Level, objects: TiledObject[]) : any[] {
		let enemies:any = []
	    for(let object of objects){
	      let type = (object.type) ? object.type : 1;
	      let enemy = new Enemy(scene, object.x, object.y, type)
	      enemies.push(enemy)
	    }
	    return enemies;
	}

	public update() : void {
		let player = this.scene.player;
		let distanceToUser = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
		let distanceToSpawn = Phaser.Math.Distance.Between(this._spawnPosition.x, this._spawnPosition.y, this.x, this.y);
		/**
		 * Если отошел от спавна сильно далеко и пользователь рядом
		 */
		if(distanceToSpawn >= this._spawnDistance && distanceToUser < this._agrDistance) {
			this.setVelocityX(0)
			return
		}

		/**
		 * Если вернулся к спавну и соперник далеко
		 */
		if(distanceToUser > this._agrDistance && distanceToSpawn <= 10) {
			this.setVelocityX(0)
			return
		}

		/**
		 * Есил спавн далеко и пользователь далеко - возвращаемся на спавн
		 */
		if(distanceToSpawn >= this._spawnDistance && distanceToUser > this._agrDistance) {
			if(this._spawnPosition.x < this.x) {
				this.setVelocityX(this._returnSpeed * -1)
			}else{
				this.setVelocityX(this._returnSpeed)
			}
		}

		/**
		 * Если пользователь близко - подходим к нему
		 */
		if( distanceToUser < this._agrDistance ) {
			if(player.x < this.x) {
				this.setVelocityX(this._speed * -1)
			}else{
				this.setVelocityX(this._speed)
			}
		}

	}

}