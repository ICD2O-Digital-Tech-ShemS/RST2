/* global phaser */
// Created by: shem
// Created on: May 2025
// This is the splash scene for the game

/**
 * This class is the splash scene for the game
 */
class SplashScene extends Phaser.Scene {
    constructor() {
        super({ key: 'splashScene' });
    }


    init (data) {
    this.cameras.main.setBackgroundColor("ffffff");
    }

    preload() {
        console.log('Splash Scene');
        this.load.image('splashSceneBackground', './assets/splashSceneImage.png')
    }

    create(data) {
        this.splashSceneBackgroundImage = this.add.sprite(0, 0, 'splashSceneBackground').setScale(2.75)
        this.splashSceneBackgroundImage.x = 1920 / 2
        this.splashSceneBackgroundImage.y = 1080 / 2
    }

    update(time, delta) {
        if (time > 2000) {
            this.scene.switch('titleScene')
        }
    }
}
    export default SplashScene