/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Game level scene
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Win extends Phaser.Scene {

  private props: any;
  private hero: Phaser.GameObjects.Sprite
  public audio : { [s: string]: Phaser.Sound.BaseSound } = {}

  /**
   * basic scene properties
   */
  constructor() {
    super({
      key: "win"
    });
  }

  /**
   * method called when all assets was loaded
   */
  create(props: any) : void {
    this.audio.end = this.sound.add('end');
    this.audio.end.play();

    this.hero = this.add.sprite(-50, Config.height/2, props.hero);
    this.hero.anims.play(`${props.hero}@run`);
    
    this.props = props;

    this.tweens.add({
      targets: this.hero,
      duration: 1500,
      x: Config.width/2,
      onComplete: () => this.addHeaderText()
    })

  }

  addHeaderText() {
    let text = this.add.text(Config.width/2, -150, "Уровень пройден!", {fontSize: 35, fontFamily: "Arial"}).setOrigin(.5);
    this.tweens.add({
      targets: text,
      duration: 700,
      y: 30,
      onComplete: () => this.showStats()
    })
  }

  showStats() {
    let left = {
      text: this.add.text(20, 90, "На этом уровне", {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      coins: this.add.text(20, 120, `${this.props.coins} монет собрано`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      lifes: this.add.text(20, 140, `${this.props.lifes} жизни осталось`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      killes: this.add.text(20, 160, `${this.props.killes} монстров убито`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0)
    };

    let total:any = window.localStorage.getItem('totalScore');
    if(total) total = JSON.parse(total);
    if(!total){ 
      total = {
        coins: 0,
        lifes: 0,
        killes: 0
      };
      window.localStorage.setItem('totalScore', JSON.stringify(total))
    }
    
    total.coins += this.props.coins
    total.lifes += this.props.lifes
    total.killes += this.props.killes

    window.localStorage.setItem('totalScore', JSON.stringify(total))

    let right = {
      text: this.add.text(Config.width - 200, 90, "В общей сумме у Вас", {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      coins: this.add.text(Config.width - 200, 120, `${total.coins} монет собрано`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      lifes: this.add.text(Config.width - 200, 140, `${total.lifes} жизни осталось`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0),
      killes: this.add.text(Config.width - 200, 160, `${total.killes} монстров убито`, {fontSize: 16, fontFamily: "Arial"}).setOrigin(0, .5).setAlpha(0)
    };

    this.tweens.add({
      targets: [ left.text, left.coins, left.lifes, left.killes ],
      alpha: 1,
      duration: 700,
      onComplete: () => {
        this.tweens.add({
          targets: [ right.text, right.coins, right.lifes, right.killes ],
          alpha: 1,
          duration: 700,
          onComplete: () => this.addNext()
        })
      }
    })

  }


  addNext() {
    let play = this.add.image(Config.width/2, Config.height - 100, 'elements', 'play.png').setInteractive();
    this.tweens.add({
      targets: play,
      duration: 500,
      yoyo: true,
      scaleX: 1.1,
      scaleY: 1.1,
      repeat: -1
    })

    play.on('pointerdown', () => { 

      this.tweens.add({
        targets: this.hero,
        duration: 500,
        x: Config.width + 10
      })

      this.tweens.add({
        targets: this.cameras.main,
        duration: 700,
        alpha: 0,
        onComplete: () => { 
          this.scene.start('selectLevel')
          this.audio.end.pause()
        }
      })

    })
  }


  /**
   * FPS updater
   * deepth update all classes [player, enemy, ...]
   */
  update() : void {

  }

}