# 123check value
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Phaser from 'phaser';

@Component({
  selector: 'app-game',
  template: `<div #gameContainer class="game-container"></div>`,
  styles: [`
    .game-container {
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class GameComponent implements OnInit {
  @ViewChild('gameContainer', { static: true }) gameContainer!: ElementRef;
  game!: Phaser.Game;

  ngOnInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: this.gameContainer.nativeElement,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    };

    this.game = new Phaser.Game(config);
  }

  preload(this: Phaser.Scene) {
    this.load.image('logo', 'https://labs.phaser.io/assets/sprites/phaser3-logo.png');
  }

  create(this: Phaser.Scene) {
    const logo = this.add.image(400, 150, 'logo');
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });
  }

  update(this: Phaser.Scene) {
    // Optional game logic per frame
  }
}
