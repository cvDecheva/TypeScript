module GamesPackage {
    export class ChooseGame extends Phaser.State{

        private chooseGameModel: ChooseGameModel;

        create () {
            this.chooseGameModel = new ChooseGameModel();

            this.chooseGameModel.bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "background");
            this.chooseGameModel.bg.anchor.set(0.5);

            this.createGameButton(this.chooseGameModel.tetris, this.chooseGameModel.tetrisButton,
                this.chooseGameModel.tetrisButtonText, this.game.width * 0.25,
                this.game.height * 0.05, this.game.height * 0.45, TETRIS_STATE, TETRIS_IMAGE);

            this.createGameButton(this.chooseGameModel.emojiIsland, this.chooseGameModel.emojiIslandButton,
                this.chooseGameModel.emojiIslandButtonText,
                this.game.width * 0.75, this.game.height * 0.05, this.game.height * 0.45,
                EMOJI_ISLAND_PRELOAD_STATE, EMOJI_ISLAND_IMAGE);

            this.createGameButton(this.chooseGameModel.emojiIsland, this.chooseGameModel.emojiIslandButton,
                this.chooseGameModel.emojiIslandButtonText,
                this.game.width * 0.5, this.game.height * 0.5, this.game.height * 0.9,
                SPACECRAFT_WARS_STATE, SPACECRAFT_WARS_IMAGE);
        }

        createGameButton(gameImage: Phaser.Image, button: Phaser.Button, text: Phaser.Text, x: number, imageY: number,
                         buttonY: number, state: string, key: string) {
            gameImage = this.game.add.image(x, imageY, key);
            gameImage.anchor.set(0.5, 0);
            gameImage.scale.set(0.3);

            button = this.game.add.button(x, buttonY, "sign", () => {
                this.game.state.start(state);
            });
            button.anchor.set(0.5);
            button.scale.set(0.15);

            text = this.game.add.text(0, 0, language.PLAY, { font: "44px Arial Black", fill: YELLOW_STR });
            text.stroke = BLACK_STR;
            text.strokeThickness = 16;
            text.setShadow(2, 2, "#333333", 2, true, true);
            text.anchor.set(0.5, 0.45);
            text.position = button.position;
        }

    }
}