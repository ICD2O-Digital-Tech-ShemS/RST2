// Copyright (c) 2020 Mr. Coxall All rights reserved

// Created by: shem
// Created on: May 2020
// This file contains the JS functions for index.html
/* global Phaser */

import SplashScene from './splashScene.js';
import TitleScene from './titleScene.js';
import MenuScene from './menuScene.js';
import GameScene from './gameScene.js';
import Level1 from './level1.js';
// the game scenes
const splashScene = new SplashScene();
const titleScene = new TitleScene();
const menuScene = new MenuScene();
const gameScene = new GameScene();
const level1 = new level1();



//* Game scene
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: 0xffffff,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
}
const game = new Phaser.Game(config);

//Load the scenes
//Any "key" is global and cannot be reused
game.scene.add('splashScene', splashScene);
game.scene.add('titleScene', titleScene);
game.scene.add('menuScene', menuScene);
game.scene.add('gameScene', gameScene);
game.scene.add('level1', level1);
//Start title scene
game.scene.start('splashScene');