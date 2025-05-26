import { Component, AfterViewInit } from '@angular/core';
import Phaser from 'phaser';

@Component({
  selector: 'app-walking',
  template: '<div id="gameContainer"></div>',
})
export class WalkingComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: {
        preload,
        create,
        update
      }
    };

    new Phaser.Game(config);

    function preload(this: Phaser.Scene) {
      this.load.spritesheet('man', 'assets/man-walking.png', {
        frameWidth: 32,
        frameHeight: 48
      });
    }

    function create(this: Phaser.Scene) {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('man', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      const player = this.physics.add.sprite(100, 100, 'man');
      player.anims.play('walk', true);
      this.input.keyboard.on('keydown-RIGHT', () => {
        player.x += 10;
        player.anims.play('walk', true);
      });
    }

    function update(this: Phaser.Scene) {
      // Add movement or animation logic here
    }
  }
}
