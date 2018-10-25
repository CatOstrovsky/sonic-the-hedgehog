/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @license      CatOstrovsky
 */
import Config from "../const/config"

export class Level extends Phaser.Scene {

  private _keys : any;
  public player : Phaser.Physics.Arcade.Sprite;
  private _bg : Phaser.GameObjects.TileSprite[] = [];

  constructor() {
    super({
      key: "game",
      physics: {
        default: 'arcade',
        arcade: {
          // debug: true,
          gravity: { y: 1000 }
        }
      },
    });
  }

  create() : void {

    const map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
     
    this._bg.push(this.add.tileSprite(0, map.heightInPixels - 325,map.widthInPixels, 225, 'bg_1').setOrigin(0));
    this._bg.push(this.add.tileSprite(0, map.heightInPixels - 225, map.widthInPixels, 225, 'bg_2').setOrigin(0));
   
    const tileset = map.addTilesetImage("tileset","tiles");
    const layer = map.createStaticLayer("stage", tileset, 0, 0);
    layer.setCollisionByProperty({ collide: true });

    this._keys = this.input.keyboard.addKeys('RIGHT,LEFT,UP,DOWN');
    
    this.player = this.physics.add.sprite(50, 200, "sonic");
    this.player.anims.play("sonic@normal");
    this.player.setSize(25,50)

    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.add.collider(this.player, layer);

  }

  update() : void {

    if(this._keys.RIGHT.isDown) {
      this.player.setVelocityX(250);
      this.player.setFlipX(false);
    }else if(this._keys.LEFT.isDown) {
      this.player.setVelocityX(-250);
      this.player.setFlipX(true);
    }else{
      this.player.setVelocityX(0);
    }

    this._bg[0].tilePositionX += .2;
    this._bg[1].tilePositionX -= .2;

    if(this.player.body.velocity.x != 0 
      && this.player.anims.currentAnim.key != "sonic@run"){
      this.player.anims.play("sonic@run");
    }else if(this.player.body.velocity.x == 0 
      && this.player.body.velocity.y == 0
      && this.player.anims.currentAnim.key != "sonic@normal"){
      this.player.anims.play("sonic@normal");
    }

    if(this._keys.UP.isDown && this.player.body.velocity.y == 0 ) {
      this.player.setVelocityY(-570);
    }

    if(this.player.body.velocity.y != 0
      && this.player.anims.currentAnim.key != "sonic@fly") {
      this.player.anims.play("sonic@fly");
    }


  }

}