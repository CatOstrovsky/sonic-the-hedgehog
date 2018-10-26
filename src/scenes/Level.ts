/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Game level scene
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import Player from '../objects/Player'
import Enemy from '../objects/Enemy'
import Coin from '../objects/Coin'
import Stats from '../objects/Stats'
import Helper from '../classes/Helper'
import { TiledObject } from '../classes/Interfaces'


export class Level extends Phaser.Scene {

  private _keys : any;
  public player : Phaser.Physics.Arcade.Sprite;
  private _bg : Phaser.GameObjects.TileSprite[] = []
  public layer : Phaser.Tilemaps.StaticTilemapLayer
  public enemies : Phaser.Physics.Arcade.Group
  public coins : Phaser.Physics.Arcade.Group
  public stats : Stats
  public audio : { [s: string]: Phaser.Sound.BaseSound } = {}
  public levelConfig: {[key:string] : string|number }

  /**
   * basic scene properties
   */
  constructor() {
    super({
      key: "level",
      physics: {
        default: 'arcade',
        arcade: {
          // debug: true,
          gravity: { y: 1000 }
        }
      },
    });
  }

  /**
   * method called when all assets was loaded
   */
  create(props:{[key:string] : string|number }) : void {

    this.levelConfig = { level: "1", hero: 'sonic', ...props}

    this.audio.coin = this.sound.add('coin');
    this.audio.kill = this.sound.add('kill');
    this.audio.oops = this.sound.add('oops');

    let levelConfigHelper = Helper.levels[this.levelConfig.level];
    let heroConfigHelper = Helper.heroes[this.levelConfig.hero];

    const map = this.make.tilemap({ key: levelConfigHelper.tileName, tileWidth: 32, tileHeight: 32 });
     
    this._bg.push(this.add.tileSprite(0, map.heightInPixels - 325,map.widthInPixels, 225, 'bg_1').setOrigin(0));
    this._bg.push(this.add.tileSprite(0, map.heightInPixels - 225, map.widthInPixels, 225, 'bg_2').setOrigin(0));
    
    const tileset = map.addTilesetImage("tileset","tiles");
    this.layer = map.createStaticLayer("stage", tileset, 0, 0);
    this.layer.setCollisionByProperty({ collide: true });

    // add coins group
    this.coins = this.physics.add.group({collideWorldBounds: false});

    let coinsLayout = map.getObjectLayer('coins');
    if(coinsLayout && coinsLayout.objects) {
      let objects = coinsLayout.objects as any[];
      let coins:Coin[] = Coin.DrawCoins(this, objects);

      this.coins.addMultiple(coins);
    }

    // add enemies group
    this.enemies = this.physics.add.group({collideWorldBounds: false});

    let enemiesLayout = map.getObjectLayer('enemies');
    if(enemiesLayout && enemiesLayout.objects) {
      let objects = enemiesLayout.objects as any[];
      let enemies:Enemy[] = Enemy.DrawEnemies(this, objects);

      this.enemies.addMultiple(enemies);
    }

    this.stats = new Stats(this);
    this.player = new Player(this, heroConfigHelper.name);

    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  }

  /**
   * FPS updater
   * deepth update all classes [player, enemy, ...]
   */
  update() : void {
    this.player.update();
    this.enemies.getChildren().map(enemy => enemy.update())
    this.stats.update();

    this._bg[0].tilePositionX += .2;
    this._bg[1].tilePositionX -= .2;

  }

}