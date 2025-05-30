// scenes/conclusion.scene.ts
import Phaser from 'phaser';

export class ConclusionScene extends Phaser.Scene {
  constructor() {
    super('ConclusionScene');
  }
  preload() {
    this.load.image('character', 'assets/character.png');
  }
  create() {
    // Add full screen image and position the man on the left
    const bg = this.add.image(0, 0, 'character').setOrigin(0);

    const originalWidth = bg.width;
    const originalHeight = bg.height;
    const scale = this.scale.height / originalHeight;
    bg.setScale(scale);
    bg.setPosition(0, 0);

    const contentX = bg.displayWidth / 2 + 40;

    const title = this.add.text(contentX, 40, 'Congratulations on Completing Day 1!', {
      fontSize: '26px',
      color: '#000',
      wordWrap: { width: 760 - contentX },
    });
    fadeIn(this, title);

    // Section 1: Resources
    const section1Title = this.add.text(contentX, 90, 'Important Resources:', {
      fontSize: '22px',
      color: '#000',
      fontStyle: 'bold',
    });
    fadeIn(this, section1Title);

    const links = [
      { label: 'Employee Handbook', url: 'https://company.com/handbook' },
      { label: 'HR Policies', url: 'https://company.com/hr-policies' },
      { label: 'IT Setup Guide', url: 'https://company.com/it-setup' },
      { label: 'Support Email: helpdesk@company.com', url: '' }
    ];

    links.forEach((link, index) => {
      const y = 130 + index * 30;
      const text = this.add.text(contentX, y, link.label, {
        fontSize: '18px',
        color: '#1a73e8',
        fontStyle: 'bold',
      }).setInteractive({ useHandCursor: true });

      fadeIn(this, text);

      if (link.url) {
        text.on('pointerdown', () => window.open(link.url, '_blank'));
      }
    });

    // Section 2: Transport Help Desk
    const section2Title = this.add.text(contentX, 280, 'Transport Help Desk:', {
      fontSize: '22px',
      color: '#000',
      fontStyle: 'bold',
    });
    fadeIn(this, section2Title);

    const transportText = this.add.text(contentX, 320, 'For any transport-related assistance, please contact:\ntransport@company.com', {
      fontSize: '18px',
      color: '#1a73e8',
      wordWrap: { width: 760 - contentX },
    });
    fadeIn(this, transportText);
  }
}
