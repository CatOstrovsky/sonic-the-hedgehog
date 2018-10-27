/**
 * @author       CatOstrovsky <ska_live@mail.ru>
 * @copyright    2018 web-panda
 * @description  Setup game
 * @license      CatOstrovsky
 */

// Add basic phaser namespaces
/// <reference path="../typescript/phaser.d.ts"/>

import "phaser";
import { Boot } from './scenes/Boot'
import { Wellcome } from './scenes/Wellcome'
import { Level } from './scenes/Level'
import { SelectLevel } from './scenes/SelectLevel'
import { GameOver } from './scenes/GameOver'
import { Win } from './scenes/Win'
import Config from './const/config'

const config: GameConfig = {
  ...Config,
  scene: [Boot, Wellcome, Level, SelectLevel, GameOver, Win]
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};