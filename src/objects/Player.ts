/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import { Level } from '../scenes/Level'
import Coin from '../objects/Coin'
import Enemy from '../objects/Enemy'
import Helper from '../classes/Helper'

export default class Player extends Phaser.Physics.Arcade.Sprite {
	
	private _keys : Phaser.Input.Keyboard.CursorKeys

	constructor(public scene: Level, public type:string = "sonic", public x: number = 100, public y: number = 500) {
		super(scene, x, y, type)
		scene.physics.world.enable(this)
		this.scene.add.existing(this)

		this.anims.play(`${type}@normal`)
		this.setSize(25,50)

		this._keys = this.scene.input.keyboard.createCursorKeys()

		scene.physics.add.collider(this, scene.layer, (player:Player, object: any) => {
			if(object.properties.hasOwnProperty('danger') && object.properties['danger'] == true) {
				this.scene.stats.removeLife();
				if(player.y < object.y) {
					player.setVelocityY(-650);
				}
				
			}
		}) 

		scene.physics.add.collider(this, scene.coins, ()=>{},
		(player: Player, coin: Coin) => {
			this.colliderCoins(player, coin);
			return false
		})

		scene.physics.add.collider(this, scene.enemies, 
		(player: Player, enemy: Enemy) => {
			this.colliderEnemy(player, enemy);
		})
	}

	private colliderCoins(player: Player, coin: Coin) {
		this.scene.coins.remove(coin, true, true);
		this.scene.stats.addCoin(); /**STATS**/
	}

	private colliderEnemy(player: Player, enemy: Enemy) {
		if(player.y+player.displayHeight/3 < enemy.y - enemy.displayHeight/2) {
			this.scene.enemies.remove(enemy, true, true);
			this.scene.stats.addKill(); /**STATS**/
			player.setVelocityY(-450)
		}else{
			this.scene.stats.removeLife(); /**STATS**/

			enemy.setVelocityX(0);
			if(player.x > enemy.x) {
				player.setVelocity(350, -150)
			}else{
				player.setVelocity(-350, -150)
			}
		}
	}

	update() : void {
		if(this._keys.right.isDown) {
	      this.setVelocityX(250);
	      this.setFlipX(false);
	    }else if(this._keys.left.isDown) {
	      this.setVelocityX(-250);
	      this.setFlipX(true);
	    }else{
	      this.setVelocityX(0);
	    }

	    if(this.body.velocity.x != 0 
	      && this.anims.currentAnim.key != `${this.type}@run`){
	      this.anims.play(`${this.type}@run`);
	    }else if(this.body.velocity.x == 0 
	      && this.body.velocity.y == 0
	      && this.anims.currentAnim.key != `${this.type}@normal`){
	      this.anims.play(`${this.type}@normal`);
	    }

	    if(this._keys.up.isDown && this.body.velocity.y == 0 ) {
	      this.setVelocityY(-570);
	    }

	    if(this.body.velocity.y != 0
	      && this.anims.currentAnim.key != `${this.type}@fly`) {
	      this.anims.play(`${this.type}@fly`);
	    }
	}

}