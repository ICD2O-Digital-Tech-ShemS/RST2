/* global phaser */
// Created by: Shem
// Created on: May 2025
// This is theGame Scene for the game

/**
 * This class is the Game Scene for the game
 */
class GameScene extends Phaser.Scene {
    
    // create an alien
    createAlien() {
        const alienXLocation = Math.floor(Math.random() * 1920) + 2
        let alienXVelocity = Math.floor(Math.random() * 50) + 2
        alienXVelocity *= Math.round(Math.random()) ? 1 : -1
        const anAlien = this.physics.add.sprite(alienXLocation, -99, 'alien')
        anAlien.body.velocity.y = 200
        anAlien.body.velocity.x = alienXVelocity
        this.alienGroup.add(anAlien)
    }

    constructor() {
        super({ key: 'gameScene' });

        this.background = null
        this.ship = null
        this.fireMissile = false
        this.isGameOver = false
        this.score = 0
        this.scoreText = null
        this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
        
        this.gameOverText = null
        this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
    }
  
  
    init(data) {
        this.cameras.main.setBackgroundColor("AEA04B");
    }
  
    preload() {
        console.log('Game Scene');

        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
        this.load.image('missile', 'assets/missile.png')
        this.load.image('alien', 'assets/alien.png')
        // sound
        this.load.audio('laser', 'assets/laser1.wav')
        this.load.audio('explosion', 'assets/barrelExploding.wav')
        this.load.audio('bomb', 'assets/bomb.wav')
    }

    create(data) {
        this.fireMissile = false
        this.isGameOver = false
        this.score = 0
        this.background = this.add.image(0, 0, 'starBackground').setScale(2.0)
        this.background.setOrigin(0, 0)
        this.scoreText = this.add.text(10, 10, 'score: ' + this.score.toString(), this.scoreTextStyle)
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
        this.missileGroup = this.physics.add.group()
        this.alienGroup = this.add.group()
        this.createAlien()
        this.physics.add.overlap(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
            alienCollide.destroy()
            missileCollide.destroy()
            this.score = this.score + 1
            this.scoreText.setText('Score: ' + this.score.toString())
            this.sound.play('explosion')
            this.createAlien()
            this.createAlien()
        }.bind(this))
    
        this.physics.add.collider(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
            this.sound.play('bomb')
            this.physics.pause()
            alienCollide.destroy()
            shipCollide.destroy()
            this.isGameOver = true
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => this.scene.start('gameScene'))
        }.bind(this))
    }
    

    update(time, delta) {
        if (this.isGameOver) {
            return
        }
    
        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')
        const keySpaceObj = this.input.keyboard.addKey('SPACE')
    
        if (keyLeftObj.isDown === true) {
            this.ship.x -= 15
            if (this.ship.x < 0) {
                this.ship.x = 1920
            }
        }
    
        if (keyRightObj.isDown === true) {
            this.ship.x += 15
            if (this.ship.x > 1920) {
                this.ship.x = 0
            }
        }
    
        if (keySpaceObj.isDown === true) {
            if (this.fireMissile === false &&!this.isGameOver) {
                this.fireMissile = true
                const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
                this.missileGroup.add(aNewMissile)
                this.sound.play('laser')
            }
        }
    
        if (keySpaceObj.isUp === true) {
            this.fireMissile = false
        }
    
        this.missileGroup.children.each(function (item) {
            item.y = item.y - 15
            if (item.y < 0) {
                item.destroy()
            }
        })
        if (time > 60000) {
            this.scene.switch('level1')
        }
    }
    
}    
    export default GameScene