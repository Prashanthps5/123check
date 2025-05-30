import Phaser from 'phaser';

export class ConclusionScene extends Phaser.Scene {
  constructor() {
    super('ConclusionScene');
  }
  preload() {
    this.load.image('character', 'assets/character.png');
  }
  create() {
    // Add full screen white background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xffffff).setOrigin(0);

    // Add image and position the man on the left
    const bg = this.add.image(0, 0, 'character').setOrigin(0);

    const originalWidth = bg.width;
    const originalHeight = bg.height;
    const scale = this.scale.height / originalHeight;
    bg.setScale(scale);
    bg.setPosition(0, 0);

    const imageWidth = bg.displayWidth;
    const contentX = imageWidth + 20; // move content right after image

    const title = this.add.text(contentX, 40, 'Congratulations on Completing Day 1!', {
      fontSize: '26px',
      color: '#000',
      wordWrap: { width: this.scale.width - contentX - 20 },
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
    const section2Title = this.add.text(contentX, 300, 'Transport Help Desk:', {
      fontSize: '22px',
      color: '#000',
      fontStyle: 'bold',
    });
    fadeIn(this, section2Title);

    const headers = ['Location', 'Contact Email'];
    const data = [
      ['Head Office', 'transport@company.com'],
      ['Branch A', 'transport.a@company.com'],
      ['Branch B', 'transport.b@company.com']
    ];

    const tableStartY = 340;
    const columnWidths = [120, 300];

    // Draw headers
    headers.forEach((header, i) => {
      const text = this.add.text(contentX + i * columnWidths[i], tableStartY, header, {
        fontSize: '18px',
        fontStyle: 'bold',
        color: '#000'
      });
      fadeIn(this, text);
    });

    // Draw rows
    data.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const y = tableStartY + 30 + rowIndex * 25;
        const x = contentX + colIndex * columnWidths[colIndex];
        const text = this.add.text(x, y, cell, {
          fontSize: '16px',
          color: '#000'
        });
        fadeIn(this, text);
      });
    });
  }
}
