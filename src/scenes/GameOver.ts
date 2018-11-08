/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Game level scene
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class GameOver extends Phaser.Scene {

  public audio : { [s: string]: Phaser.Sound.BaseSound } = {}

  /**
   * basic scene properties
   */
  constructor() {
    super({
      key: "gameOver"
    });
  }

  /**
   * method called when all assets was loaded
   */
  create(props: any) : void {

    this.audio.death = this.sound.add('death');
    this.audio.death.play();

    let graphic = this.add.graphics();
    graphic.fillStyle(0x000000, 1)
    graphic.fillRect(0, 0, Config.width, Config.height)

    let text = this.add.text(Config.width/2, 110, "GAME OVER", {fontSize: 35, fontWeight: "bold"}).setOrigin(.5)
    let text2 = this.add.text(Config.width/2, 160, "Попробовать еще раз?", {fontSize: 20, fontWeight: "bold"}).setOrigin(.5)
    let phone = this.add.sprite(Config.width/2, 270, 'elements', 'crying.png')

    this.tweens.add({
      targets: text,
      yoyo: true,
      repeat: -1,
      duration: 1000,
      scaleX: 1.05
    })

    this.tweens.add({
      targets: phone,
      yoyo: true,
      repeat: -1,
      duration: 700,
      angle: 15
    })


    this.add.image(200, Config.height - 150, 'elements', 'close.png').setInteractive()
    .on('pointerdown', () => {
      this.audio.death.pause()
      this.scene.start('selectLevel')
    })
    this.add.image(Config.width - 200, Config.height - 150, 'elements', 'checked.png').setInteractive()
    .on('pointerdown', () => {
      this.audio.death.pause()
      this.scene.start('level', props)
    })

  }


  /**
   * FPS updater
   * deepth update all classes [player, enemy, ...]
   */
  update() : void {

  }

}