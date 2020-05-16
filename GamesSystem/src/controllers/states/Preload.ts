/// <reference path = "../../../lib/phaser.d.ts"/>

module GamesPackage {
    export class Preload extends Phaser.State {

        background:Phaser.Image;

        preload() {
            // ChooseGame
            this.game.load.image("background","assets/chooseGame/bg.jpg");
            this.game.load.image("sign","assets/chooseGame/sign.png");
            this.game.load.image("emojiGame","assets/chooseGame/emojiGame.png");
            this.game.load.image("tetrisGame","assets/chooseGame/tetrisGame.png");
            this.game.load.image("spacecraftWars","assets/chooseGame/spacecraftWars.png");

            // Tetris
            this.game.load.image("square","assets/tetris/square.png");
            this.game.load.image("tetrisLogo","assets/tetris/tetris-logo.jpg");

            // EmojiIsland
            this.game.load.image("platform","assets/emojiIsland/platform.png");
            this.game.load.image("map","assets/emojiIsland/map.jpg");
            this.game.load.image("emoji","assets/emojiIsland/emoji.png");
            this.game.load.image("ball","assets/emojiIsland/ball.png");
            this.game.load.image("logo","assets/emojiIsland/logo.png");
            this.game.load.image("level1","assets/emojiIsland/level1.png");
            this.game.load.image("level2","assets/emojiIsland/level2.png");
            this.game.load.image("level3","assets/emojiIsland/level3.png");
            this.game.load.image("1","assets/emojiIsland/1.png");
            this.game.load.image("2","assets/emojiIsland/2.png");
            this.game.load.image("3","assets/emojiIsland/3.png");
            this.game.load.image("4","assets/emojiIsland/4.png");
            this.game.load.image("5","assets/emojiIsland/5.png");
            this.game.load.image("6","assets/emojiIsland/6.png");
            this.game.load.image("7","assets/emojiIsland/7.png");
            this.game.load.image("8","assets/emojiIsland/8.png");
            this.game.load.image("9","assets/emojiIsland/9.png");

            // SpacecraftWars
            this.game.load.image('powerUp', 'assets/spacecraftWars/powerUp.png');
            this.game.load.image('rock', 'assets/spacecraftWars/rock.png');
            this.game.load.image('rocket', 'assets/spacecraftWars/rocket.png');
            this.game.load.image('ship', 'assets/spacecraftWars/ship.png');
            this.game.load.image('space', 'assets/spacecraftWars/space.jpg');
            this.game.load.image('button', 'assets/gameOver/button.png');

            // Game Over
            this.game.load.image("gameOver","assets/gameOver/gameOver.png");
            this.game.load.image("resetBtn","assets/gameOver/resetBtn.png");
            this.game.load.image("homeBtn","assets/gameOver/homeBtn.png");

            // Backgrounds
            this.game.load.image("bg1","assets/emojiIsland/bg1.png");
            this.game.load.image("bg2","assets/emojiIsland/bg2.jpg");
            this.game.load.image("bg3","assets/emojiIsland/bg3.jpg");

            this.game.load.image("pause","assets/pause.png");

            this.game.load.json('levels', 'assets/levels.json');

        }

        create() {
            this.game.state.start(CHOOSE_GAME_STATE);
        }
    }
}