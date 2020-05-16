module GamesPackage {
    export class PauseController {

        private game: Phaser.Game;

        private bg: Phaser.Graphics;

        private resetBtn: Phaser.Image;
        private homeBtn: Phaser.Image;
        private pauseBtn: Phaser.Image;

        constructor(game: Phaser.Game, state: string) {
            this.game = game;

            this.pauseBtn = this.game.add.image(0, this.game.height * 0.85, "pause");
            this.pauseBtn.scale.set(0.2);
            this.pauseBtn.inputEnabled = true;
            this.pauseBtn.events.onInputUp.add(() => {
                this.game.paused = true;

                this.bg = this.game.add.graphics(0, 0);
                this.bg.beginFill(0x000000, 0.6);
                this.bg.drawRect(0, 0, this.game.width, this.game.height);
                this.bg.endFill();

                this.resetBtn = this.game.add.image(this.game.width * 0.6, this.game.height * 0.8, "resetBtn");
                this.resetBtn.anchor.set(0.5);

                this.homeBtn = this.game.add.image(this.game.width * 0.4, this.game.height * 0.8, "homeBtn");
                this.homeBtn.anchor.set(0.5);

                this.resetBtn.width = this.resetBtn.height = this.homeBtn.width = this.homeBtn.height = this.game.width * 0.2;

                this.game.input.onDown.add((event) => {
                    if (this.game.paused) {
                        let homeBtnBounds = [this.homeBtn.x - this.homeBtn.width * 0.5,
                            this.homeBtn.x + this.homeBtn.width * 0.5,
                            this.homeBtn.y - this.homeBtn.height * 0.5,
                            this.homeBtn.y + this.homeBtn.height * 0.5];
                        let resetBtnBounds = [this.resetBtn.x - this.resetBtn.width * 0.5,
                            this.resetBtn.x + this.resetBtn.width * 0.5,
                            this.resetBtn.y - this.resetBtn.height * 0.5,
                            this.resetBtn.y + this.resetBtn.height * 0.5];

                        this.game.paused = false;

                        if (event.x > homeBtnBounds[0] && event.x < homeBtnBounds[1] &&
                            event.y > homeBtnBounds[2] && event.y < homeBtnBounds[3]) {
                            this.game.state.start(CHOOSE_GAME_STATE);
                        } else if (event.x > resetBtnBounds[0] && event.x < resetBtnBounds[1] &&
                            event.y > resetBtnBounds[2] && event.y < resetBtnBounds[3]) {
                            this.game.state.start(state);
                        }
                        else {
                            if (this.resetBtn) {
                                this.bg.destroy();
                                this.bg = null;

                                this.resetBtn.destroy();
                                this.resetBtn = null;

                                this.homeBtn.destroy();
                                this.homeBtn = null;
                            }
                        }
                    }
                }, self);
            }, this);
        }

    }
}