/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Wellcome game display
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Wellcome extends Phaser.Scene {

  private _tileBg : Phaser.GameObjects.TileSprite;
  private _keys : any;
  private _lock : boolean = false
  public audio : { [s: string]: Phaser.Sound.BaseSound } = {}

  /**
  * basic scene properties
  */
  constructor() {
    super({
      key: "wellcome",
    });
  }

  /**
  * method called when all assets was loaded
  */
  create() : void {

    this.audio.home = this.sound.add('home');
    this.audio.home.play();

    this._tileBg = this.add.tileSprite(0, 0, Config.width, Config.height, 'pattern').setOrigin(0,0);

    let bg = this.add.sprite(Config.width/2, Config.height/2, 'bg');
    bg.anims.play("bg@normal");

    let sonicBg = this.add.sprite(Config.width/2, Config.height/2 - 72, 'bg');
    sonicBg.anims.play("bg@sonic");

    let text = this.add.text(Config.width/2, Config.height/2 + 120, "Нажмите ENTER что бы начать", { fontFamily:"Arial", color: "#ffffff"}).setOrigin(.5)
  
    this.add.tween({
      targets: text,
      delay: 60,
      alpha: 0,
      yoyo: true,
      repeat: -1
    })

    this._keys = this.input.keyboard.addKeys('ENTER');
 
 }

  /**
   * FPS updater
   */
  update() : void {
    this._tileBg.tilePositionX += .3;
    if(this._keys.ENTER.isDown && !this._lock) {
      this._lock = true;

      this.add.tween({
        targets: this.cameras.main,
        alpha: 0,
        duration: 350,
        onComplete: () => {
          this.audio.home.pause();
          this.scene.start('selectLevel');
        }
      });
    }
  }

}