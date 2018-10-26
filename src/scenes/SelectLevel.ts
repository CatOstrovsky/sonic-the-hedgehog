/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Game level scene
 * @license      CatOstrovsky
 */
import Config from "../const/config"
import Helper from "../classes/Helper"

export class SelectLevel extends Phaser.Scene {

  private _hero: any = Helper.heroes.sonic
  private _level: any = Helper.levels[1]
  private _heroes: any[] = []
  private _levels: any[] = []
  private _bg: Phaser.GameObjects.TileSprite

  /**
   * basic scene properties
   */
  constructor() {
    super({
      key: "selectLevel"
    });
  }

  /**
   * method called when all assets was loaded
   */
  create() : void {
    this._bg = this.add.tileSprite(0, 0, Config.width, Config.height, 'bg_select_hero').setOrigin(0);

    this.add.text(50, 20, "Выберите персонажа", {fontSize: 23})
    this.drawHeroes()
    this.setActiveHero()

    this.add.text(Config.width / 2, 20, "Выберите Уровень", {fontSize: 23})
    this.drawLevels()
    this.setActiveLevel()

    let play = this.add.image(90, Config.height - 80, 'elements', 'play.png').setInteractive()

    this.tweens.add({
      targets: play,
      duration: 500,
      yoyo: true,
      repeat: -1,
      scaleX: .8,
      scaleY: .8
    })

    play.on('pointerdown', () => {
      this.scene.start('level', {level: this._level.key, hero: this._hero.key})
    })
  }

  /**
   * Display levels list
   */
  drawLevels(): void {
    let levels = Helper.levels as object;
    let xFactor:number = 0;
    let yFactor:number = 0;

    for(let key of Object.keys(levels)) {
      let level = levels[key];

      if(xFactor == 2) {
        xFactor = 0;
        yFactor++;
      }

      let x:number = Config.width / 2 + (180 * xFactor-1);
      let y:number = 150 * yFactor;

      let levelEl = this.add.image(x, 100 + y , level.image).setOrigin(0, 0).setInteractive()

      this.add.text(levelEl.x + (levelEl.displayWidth/2), levelEl.y - 20, level.name, {fontSize: 14}).setOrigin(.5);

      levelEl.on('pointerdown', () => {
        this.changeLevel(level.key)
      })

      this._levels.push({el: levelEl, key: level.key});

      xFactor++;
    }
  }

  setActiveLevel(): void {
    for(let level of this._levels) {
      let alpha = .6
      if(this._level.key == level.key)
        alpha = 1
      
      this.tweens.add({
        targets: level.el,
        duration: 150,
        alpha: alpha,
        repeat: 0
      })
    }
  }

  changeLevel(name:string): void {
    this._level = Helper.levels[name]
    this.setActiveLevel()
  }

  
  /**
   * display all heroes who initialized in Helper constant
   */
  drawHeroes(): void {
    let heroes = Helper.heroes as object;
    let i:number = 0;
    for(let key of Object.keys(heroes)) {
      let hero = heroes[key];
      let heroEl = this.add.sprite((120 * i++), 150, hero.key)
      .setScale(1.4)
      .setOrigin(0, 1)
      .setInteractive()

      heroEl.on('pointerdown', () => {
        this.changeHero(hero.key)
      })

      this._heroes.push({el: heroEl, key: hero.key});
    }
  }

  /**
   * Play active hero animation and set name to _hero varible
   */
  setActiveHero(): void {
    for(let hero of this._heroes) {
      if(this._hero.key == hero.key) {
        if(hero.el.anims)
          hero.el.anims.play(`${hero.key}@run`)
      }else{
        if(hero.el.anims)
          hero.el.anims.stop()
      }
    }
  }

  changeHero(name:string): void {
    this._hero = Helper.heroes[name]
    this.setActiveHero()
  }

  

  /**
   * FPS updater
   * deepth update all classes [player, enemy, ...]
   */
  update() : void {
    this._bg.tilePositionX += 3;
  }

}