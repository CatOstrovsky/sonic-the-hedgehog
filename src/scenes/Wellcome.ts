/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Wellcome extends Phaser.Scene {

  constructor() {
    super({
      key: "wellcome",
    });
  }

  create() : void {

    var config = {
        key: 'jump',
        frames: this.anims.generateFrameNumbers('panda', null),
        frameRate: 10,
        repeat: -1
    };
    var anim = this.anims.create(config);

    let panda = this.add.sprite(Config.width/2, Config.height/2, 'panda');

    if(anim.frames.length){
      panda.anims.play("jump");
    }else{
      console.error("not found frames", anim)
    }
   
    this.add.text(Config.width/2, 30, "All ready!", { fontColor: 0xffffff, fontSize: 20, textAlign: 'center' }).setOrigin(.5, 0).setScale(.5);

  }

  update() : void {

  }

}