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

  /**
   * load all assets files
   */
  preload() : void {

  	this.load.spritesheet('sonic', 'assets/images/heroes/sonic.png', { frameWidth: 73, frameHeight: 55 });
    this.load.spritesheet('sm', 'assets/images/heroes/sm.png', { frameWidth: 116, frameHeight: 65 });
    this.load.spritesheet('knukles', 'assets/images/heroes/knukles.png', { frameWidth: 54, frameHeight: 54 });
    this.load.spritesheet('bg', 'assets/images/bg.png', { frameWidth: 250, frameHeight: 147 });

    this.load.image('pattern', 'assets/images/pattern.jpg');
    this.load.spritesheet('coin', 'assets/images/coin.png', { frameWidth: 64, frameHeight: 64 });

    this.load.image('bg_1', 'assets/images/bg/1.png');
    this.load.image('bg_2', 'assets/images/bg/2.png');

    this.load.image('bg_select_hero', 'assets/images/bg/3.jpg');
     
    this.load.image('tiles', 'assets/levels/1/tiles.png')
    this.load.tilemapTiledJSON({ key: 'level_1', url: 'assets/levels/1/tilemap.json' })
    this.load.tilemapTiledJSON({ key: 'level_2', url: 'assets/levels/2/tilemap.json' })
    this.load.tilemapTiledJSON({ key: 'level_3', url: 'assets/levels/3/tilemap.json' })
    this.load.tilemapTiledJSON({ key: 'level_4', url: 'assets/levels/4/tilemap.json' })

    this.load.atlas('enemies', 'assets/images/enemies.png', 'assets/images/enemies.json')
    this.load.atlas('elements', 'assets/images/elements.png', 'assets/images/elements.json')

    this.load.audio('coin', ['assets/audio/coin.mp3']);
    this.load.audio('kill', ['assets/audio/kill.mp3']);
    this.load.audio('oops', ['assets/audio/oops.mp3']);

    this.load.audio('game', ['assets/audio/game.mp3']);
    this.load.audio('home', ['assets/audio/home.mp3']);
    this.load.audio('death', ['assets/audio/death.mp3']);
    this.load.audio('end', ['assets/audio/end.mp3']);
    this.load.audio('level', ['assets/audio/level.mp3']);

    this.load.image('level_1@preview', 'assets/levels/1/preview.jpg')

    this.biuldLoader();
  }

  /**
   * build preloader progress line
   */
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

  /**
   * create enemies sprites
   * @param {number}    num   type
   * @param {any}       basic basic props
   * @param {number =     0}           start start frame
   * @param {number =     1}           end   end frame
   */
  makeEnemy(num:number, basic: any, start:number = 0, end:number = 1) : void {
    this.anims.create({ key: `enemy_${num}@normal`, 
    frames: this.anims.generateFrameNames('enemies', {
      start: start, end: end, prefix: `${num}/sprite_`, suffix: '.png'
    }), 
    ...basic });
  }

  /**
   * create all animations
   */
  makeAnims() : void {
    let basic = { frameRate: 13, repeat: -1 };
    // Enemies
    this.makeEnemy(1, basic, 1, 5);
    this.makeEnemy(2, basic, 1, 5);
    this.makeEnemy(3, basic, 1, 4);
    this.makeEnemy(4, basic, 1, 3);
    this.makeEnemy(5, basic, 1, 6);
    this.makeEnemy(6, basic, 2, 4);
    this.makeEnemy(7, basic, 1, 3);
    this.makeEnemy(8, basic, 2, 6);

    // Coin animations
    this.anims.create({  key: 'coin@normal',
      frames: this.anims.generateFrameNumbers('coin', { start: 1, end: 16 }),
      frameRate: 22,
      repeat: -1
    });

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

    this.anims.create({  key: 'sonic@fly',
      frames: this.anims.generateFrameNumbers('sonic', { start: 87, end: 93 }),
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

  /**
   * method called when all assets was uploaded
   */
  create() : void {
    this.makeAnims();
  	this.scene.start('wellcome');

  }

}