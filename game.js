const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87ceeb',
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

let player;
let cursors;
let books;
let score = 0;
let scoreText;
let gameOver = false;

function preload() {
    this.load.image('player', 'https://raw.githubusercontent.com/kenneyNL/platformer-pack-redux/main/PNG/Characters/character_001.png');
    this.load.image('book', 'https://raw.githubusercontent.com/kenneyNL/space-kit/main/PNG/Misc/bookRed.png');
}

function create() {
    player = this.physics.add.sprite(400, 550, 'player').setScale(1.5);
    player.setCollideWorldBounds(true);

    books = this.physics.add.group();
    this.time.addEvent({
        delay: 500,
        callback: () => {
            let x = Phaser.Math.Between(50, 750);
            let book = books.create(x, 0, 'book').setScale(1.2);
            book.setVelocityY(200);
        },
        loop: true
    });

    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#000' });

    this.physics.add.collider(player, books, () => {
        this.physics.pause();
        scoreText.setText('Game Over! Score: ' + score);
        gameOver = true;
    }, null, this);
}

function update() {
    if (gameOver) return;

    if (cursors.left.isDown) player.setVelocityX(-300);
    else if (cursors.right.isDown) player.setVelocityX(300);
    else player.setVelocityX(0);

    score += 1;
    scoreText.setText('Score: ' + score);
}

new Phaser.Game(config);
