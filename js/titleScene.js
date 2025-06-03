/* global phaser */
// Created by: Shem
// Created on: May 2025
// This is the title Scene for the game

/**
 * This class is the title Scene for the game
 */
class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
        this.titleSceneBackgroundImage = null
        this.titleSceneText = null
        this.titleSceneTextStyle = { font: '180px Arial', fill: '#fde4b9', align: 'center' };
    }


    init (data) {
    this.cameras.main.setBackgroundColor("eb3a15");
    }

    preload() {
        console.log('Title Scene');
        this.load.image('titleSceneBackground', './assets/aliens_screen_image.jpg')
    }
    create(data) {
        this.titleSceneBackground = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
        this.titleSceneBackground.x = 1920 / 2
        this.titleSceneBackground.y = 1080 / 2
        this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Aliens', this.titleSceneTextStyle).setOrigin(0.5);
    }
    update(time, delta) { 
        if (time > 4000) {
            this.scene.switch('menuScene')
        }
    }
}
    export default TitleScene