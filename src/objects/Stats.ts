/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import { Level } from '../scenes/Level'

export default class Stats {

	private _coins: number = 0
	private _coinElement: Phaser.GameObjects.Text

	private _killes: number = 0
	private _killesElement: Phaser.GameObjects.Text

	private _lifes: number = 3
	private _maxLife: number = 10
	private _lifeLocked: boolean = false
	private _lifesElement: Phaser.GameObjects.Group

	constructor(public scene: Level) {
		this._lifesElement = scene.add.group();

		for (var i = 1; i <= this._maxLife; i++) {
			let life = scene.add.image(i * 20, 20, 'elements', 'heart.png').setScrollFactor(0,0).setScale(.7).setVisible(false);
			this._lifesElement.add(life)
		}

		scene.add.image(20, 45, 'elements', 'coins.png').setScrollFactor(0,0).setScale(.7)
		this._coinElement = scene.add.text(35, 37, `${this._coins}`, { color: "#ffffff", fontSize: 15 }).setScrollFactor(0,0)

		scene.add.image(20, 70, 'elements', 'flash.png').setScrollFactor(0,0).setScale(.7)
		this._killesElement = scene.add.text(35, 62, `${this._killes}`, { color: "#ffffff", fontSize: 15 }).setScrollFactor(0,0)
	}

	private _updateLife() : void {

		this._lifesElement.getChildren().map((life:Phaser.GameObjects.Image, index:number) => {
			life.setVisible(index < this._lifes)
		})
	}

	private _updateCoins() : void {
		this._coinElement.setText(`${this._coins}`);
	}

	private _updateFlash() : void {
		this._killesElement.setText(`${this._killes}`);
	}

	public addLife() : void {
		this._lifes++;
	}

	public addCoin() : void {
		this._coins++;
		this.scene.audio.coin.play();
	}

	public addKill() : void {
		this._killes++;
		this.scene.audio.kill.play();
	}

	public removeLife() : void {
		if(!this._lifeLocked) {
			this._lifeLocked = true;
			this._lifes--;
			setTimeout(() => {this._lifeLocked = false}, 700)
			this.scene.audio.oops.play()

			/**
			 * Game over
			 */
			if(this._lifes <= 0) {
				this.scene.audio.game.pause()
				this.scene.scene.start('gameOver', this.scene.levelConfig)
			}
		}
	}

	public getStats() : object {
		return {
			coins: this._coins,
			lifes: this._lifes,
			killes: this._killes
		}
	} 

	public update() : void {
		this._updateCoins()
		this._updateFlash()
		this._updateLife()
	}

}