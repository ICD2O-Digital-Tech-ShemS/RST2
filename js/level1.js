/* global phaser */
// Created by: Shem
// Created on: May 2025
// This is theGame Scene for the game

/**
 * This class is the Game Scene for the game
 */
class Level1 extends Phaser.Scene {

    createAlien() {
        const alienXLocation = Math.floor(Math.random() * 1920) + 1
        let alienXVelocity = Math.floor(Math.random() * 50) + 1
        alienXVelocity *= Math.round(Math.random()) ? 1 : -1
        const anAlien = this.physics.add.sprite(alienXLocation, -100, 'alien')
        anAlien.body.velocity.y = 200
        anAlien.body.velocity.x = alienXVelocity
        this.alienGroup.add(anAlien)
    }
    constructor() {
        super({ key: 'level1' })

        this.background = null
        this.ship = null
        this.fireMissile = false
        this.score = 0
        this.scoreText = null
        this.scoreTextStyle = { font: '65px Arial', fill: '#ffffff', align: 'center' }
        this.gameOverTextStyle = { font: '65px Arial', fill: '#ff0000', align: 'center' }
        this.gameEnd = false
    }

    init(data) {
        console.log("init(data)")
        this.cameras.main.setBackgroundColor('#ffffff')
    }
    preload() {
        console.log('level 1')
        this.load.image('starBackground', 'assets/starBackground.png')
        this.load.image('ship', 'assets/spaceShip.png')
        this.load.image('missile', 'assets/missile.png')
        this.load.image('alien', 'assets/alien.png')
        this.load.image('alienLaser', 'assets/alienLaser.png')
        //audio
        this.load.audio('laser', 'assets/laser1.wav')
        this.load.audio('explosion', 'assets/barrelExploding.wav')
        this.load.audio('bomb', 'assets/bomb.wav')
    }
    create(data) {
        this.gameEnd = false
        this.score = 0
        
        this.scoreText = this.add.text(10, 10, 'Score:' + this.score.toString(), this.scoreTextStyle)
        
        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')

        this.missileGroup = this.physics.add.group()

        this.alienGroup = this.add.group()
        this.createAlien()

        this.physics.add.overlap(this.missileGroup, this.alienGroup, function (missileCollide, alienCollide) {
            alienCollide.destroy()
            missileCollide.destroy()
            this.sound.play('explosion')
            this.score = this.score + 1
            this.scoreText.setText('Score:' + this.score.toString())
            this.createAlien()
            this.createAlien()
        }.bind(this))

        this.physics.add.overlap(this.ship, this.alienGroup, function (shipCollide, alienCollide) {
            console.log("GameEnd set to true")
            this.gameEnd = true
            this.sound.play('bomb')
            this.physics.pause()
            alienCollide.destroy()
            shipCollide.destroy()
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => {
                this.scene.start('gameScene'),
                this.gameEnd = false,
                this.score = 0
            })

        }.bind(this))
        this.alienBulletGroup = this.physics.add.group()

        this.time.addEvent({
        delay: 2000,
        callback: () => {
        if (this.alienGroup.getChildren().length > 0 && this.gameEnd === false) {
                const randomAlien = Phaser.Utils.Array.GetRandom(this.alienGroup.getChildren())
                const bullet = this.physics.add.sprite(randomAlien.x, randomAlien.y, 'alienLaser').setScale(0.13)
                bullet.body.velocity.y = 200
            this.alienBulletGroup.add(bullet)
            }
        },
        loop: true
        })
        this.physics.add.overlap(this.ship, this.alienBulletGroup, function (shipHit, bulletHit) {
            this.gameEnd = true
            this.sound.play('bomb')
            this.physics.pause()
            bulletHit.destroy()
            shipHit.destroy()
            this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({ useHandCursor: true })
            this.gameOverText.on('pointerdown', () => {
                this.scene.start('gameScene')
            })
        }.bind(this))
        

    }
    update(time, delta) {

        const keyLeftObj = this.input.keyboard.addKey('LEFT')
        const keyRightObj = this.input.keyboard.addKey('RIGHT')
        const keySpaceObj = this.input.keyboard.addKey('SPACE')
        const keyUpObj = this.input.keyboard.addKey('UP')
        const keyDownObj = this.input.keyboard.addKey('DOWN')

        if (keyLeftObj.isDown === true) {
            this.ship.x = this.ship.x - 15
            if (this.ship.x < 0) {
                this.ship.x = 0
            }
        }
        if (keyUpObj.isDown === true) {
            this.ship.y = this.ship.y - 15
            if (this.ship.y < 0) {
                this.ship.y = 0
            }
        }
        if (keyDownObj.isDown === true) {
            this.ship.y = this.ship.y + 15
            if (this.ship.y < 0) {
                this.ship.y = 0
            }
        }

        if (keyRightObj.isDown === true) {
            this.ship.x = this.ship.x + 15
            if (this.ship.x > 1920) {
                this.ship.x = 1920
            }
        }
        if (keySpaceObj.isDown === true && this.gameEnd == false) {
            if (this.fireMissile === false) {
                this.fireMissile = true
                const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
                this.missileGroup.add(aNewMissile)
                this.sound.play('laser')
                console.log('Space key pressed and gameEnd is false.')
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
        this.alienBulletGroup.children.each(function (bullet) {
            bullet.y += 10
            if (bullet.y > 1080) {
                bullet.destroy()
            }
        })
        this.alienGroup.getChildren().forEach(function (alien) {
            if (alien.y > 1080) {
                alien.destroy()
                this.createAlien()
            }
        }, this)
        
        }
    }

    export default Level1