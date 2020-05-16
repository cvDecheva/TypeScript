module GamesPackage {
    export class GameOver extends Phaser.State {
        private gameOverImage: Phaser.Image;

        private resetBtn: Phaser.Button;
        private homeBtn: Phaser.Button;

        private currentState: string;

        private bg: Phaser.Graphics;

        init(currentState) {
            this.currentState = currentState;
        }

        create() {
            this.bg = this.game.add.graphics(this.game.world.centerX, this.game.world.centerY);
            this.bg.beginFill(WHITE, 1);
            this.bg.drawRoundedRect(0, 0, this.game.width * 0.5, this.game.height * 0.9, 20);
            this.bg.endFill();
            this.bg.x = (this.game.width - this.bg.width) * 0.5;
            this.bg.y = (this.game.height - this.bg.height) * 0.5;

            this.gameOverImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "gameOver");
            this.gameOverImage.anchor.set(0.5, 0.9);

            this.resetBtn = this.game.add.button(this.game.width * 0.6, this.game.height * 0.8, "resetBtn",
                () => {
                    this.game.state.start(this.currentState);
                }, this);
            this.resetBtn.anchor.set(0.5);

            this.homeBtn = this.game.add.button(this.game.width * 0.4, this.game.height * 0.8, "homeBtn",
                () => {
                    this.game.state.start(CHOOSE_GAME_STATE);
                });
            this.homeBtn.anchor.set(0.5);

            this.resetBtn.width = this.resetBtn.height = this.homeBtn.width = this.homeBtn.height = this.game.width * 0.2;
        }
    }
}