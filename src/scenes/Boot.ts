/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Boot game scene. Gift is preloader :)
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: "boot"
    });
  }

  preload() : void {

  	this.load.spritesheet('sonic', 'assets/images/dist/heroes/sonic.png', { frameWidth: 73, frameHeight: 55 });
    this.load.spritesheet('sm', 'assets/images/dist/heroes/sm.png', { frameWidth: 116, frameHeight: 65 });
    this.load.spritesheet('knukles', 'assets/images/dist/heroes/knukles.png', { frameWidth: 54, frameHeight: 54 });
    this.load.spritesheet('bg', 'assets/images/dist/bg.png', { frameWidth: 250, frameHeight: 147 });

    this.load.image('pattern', 'assets/images/dist/pattern.jpg');
    
    this.biuldLoader();
  }

  biuldLoader() : void {

    var progress = this.add.graphics();
    let bootText = this.add.text(Config.width/2,Config.height/2, "Load assets...", {color: "#ffffff", fontSize: "30px" }).setOrigin(.5,.5);

    var onProgress = (value:number) : void => {
        progress.clear();
        let progressProcent = parseInt(`${value*100}`);
        bootText.setText(`${progressProcent}%`)
        progress.fillStyle(0x484848, 1);
        progress.fillRect(0, 0, Config.width , Config.height * value);
    }

    this.load.on('progress', (value) : void => {
        onProgress(value);
    });
  }

  makeAnims() : void {
    let basic = { frameRate: 13, repeat: -1 };

     // BG animations
    this.anims.create({  key: 'bg@sonic',
      frames: this.anims.generateFrameNumbers('bg', { start: 1, end: 5 }),
      frameRate: 7
    });

    this.anims.create({  key: 'bg@normal',
      frames: this.anims.generateFrameNumbers('bg', { start: 8, end: 8 }),
    });

    // Normal animations
    this.anims.create({  key: 'sonic@normal',
      frames: this.anims.generateFrameNumbers('sonic', { start: 4, end: 10 }),
      yoyo: true,
      ...basic
    });

    this.anims.create({ key: 'sm@normal',
      frames: this.anims.generateFrameNumbers('sm', { start: 1, end: 13 }),
      yoyo: true,
      ...basic
    });

    this.anims.create({ key: 'knukles@normal',
      frames: this.anims.generateFrameNumbers('knukles', { start: 1, end: 5 }),
      yoyo: true,
      ...basic
    });

    // Run animations
    this.anims.create({  key: 'sonic@run',
      frames: this.anims.generateFrameNumbers('sonic', { start: 50, end: 59 }),
      ...basic
    });

    this.anims.create({ key: 'sm@run',
      frames: this.anims.generateFrameNumbers('sm', { start: 34, end: 45 }),
      ...basic
    });

    this.anims.create({ key: 'knukles@run',
      frames: this.anims.generateFrameNumbers('knukles', { start: 55, end: 64 }),
      ...basic
    });


  }

  create() : void {
    this.makeAnims();
  	this.scene.start('wellcome');

  }

}