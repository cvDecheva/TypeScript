module GamesPackage {
    export class HighScoreState extends Phaser.State {

        private resetButtonLabel: Phaser.Text;
        private currentScoreLabel: Phaser.Text;
        private highScoreLabel: Phaser.Text;

        private resetButton: Phaser.Button;

        private keysForHighScores: Array<string>;

        private currentScore: number;

        private currentState: string;

        init(currentState, score) {
            this.currentState = currentState;
            this.currentScore = score;
        }

        create() {
            if(this.currentScore != null) {
                this.initHighScoreKeys(this.currentState);
                this.addToScoreBoard();
                this.initLabels();
                this.initButtons();
            }
        }

        public initLabels(): void {
            let highScore: string = "";

            this.currentScoreLabel = this.game.add.text(this.game.world.centerX, this.game.height * 0.2, language.YOUR_SCORE + this.currentScore + "\n",
                {font: "30px Comic Sans MS", fill: "#00ff00"});
            this.currentScoreLabel.anchor.set(0.5);
            this.currentScoreLabel.stroke = BLACK_STR;
            this.currentScoreLabel.strokeThickness = 16;

            highScore = language.HIGH_SCORES +"\n";
            for (let i: number = 0; i < this.keysForHighScores.length; i++) {
                highScore += (i + 1).toString() + ": " + localStorage.getItem(this.keysForHighScores[i]) + "\n";
            }
            this.highScoreLabel = this.game.add.text(this.game.world.centerX, this.game.height * 0.5, highScore,
                {font: "30px Comic Sans MS", fill: WHITE_STR, stroke: BLACK_STR});
            this.highScoreLabel.anchor.set(0.5);
            this.highScoreLabel.stroke = BLACK_STR;
            this.highScoreLabel.strokeThickness = 16;

            this.resetButtonLabel = this.game.add.text(0, 0, language.CONTINUE,
                {font: "30px Comic Sans MS", fill: WHITE_STR});
            this.resetButtonLabel.anchor.set(0.5);
            this.resetButtonLabel.setScaleMinMax(1, 1, 1, 1);
        }

        public initButtons() {
            this.resetButton = this.game.add.button(this.game.width / 2, this.game.height * 0.9, 'button',
                () => {
                    this.game.state.start(GAME_OVER_STATE, false, false, this.currentState);
                }, this);
            this.resetButton.anchor.set(0.5);
            this.resetButton.addChild(this.resetButtonLabel);
            this.resetButton.scale.set(0.15);
            this.resetButton.onInputOver.add(() => {
                this.resetButton.scale.set(0.17);
            });
            this.resetButton.onInputOut.add(() => {
                this.resetButton.scale.set(0.15);
            });
        }

        public initHighScoreKeys(gameName: string) {
            this.keysForHighScores = [];
            this.keysForHighScores.push("1" + gameName);
            this.keysForHighScores.push("2" + gameName);
            this.keysForHighScores.push("3" + gameName);
            this.keysForHighScores.push("4" + gameName);
            this.keysForHighScores.push("5" + gameName);
        }

        public addToScoreBoard() {
            for (let i: number = 0; i < this.keysForHighScores.length; i++) {
                let localStorageCurrentItem = localStorage.getItem(this.keysForHighScores[i]);
                if (localStorageCurrentItem == null) {
                    localStorage.setItem(this.keysForHighScores[i], this.currentScore.toString());
                    break;
                }
                else {
                    if (parseInt(localStorageCurrentItem) < this.currentScore) {
                        let tempArray: Array<number> = [];
                        for (let j: number = i; j < this.keysForHighScores.length; j++) {
                            if (localStorage.getItem(this.keysForHighScores[j]) != null) {
                                tempArray.push(Number(localStorage.getItem(this.keysForHighScores[j])));
                            }
                        }
                        localStorage.setItem(this.keysForHighScores[i], this.currentScore.toString());
                        let k: number = i + 1;
                        for (let j: number = 0; j < tempArray.length; j++) {
                            localStorage.setItem(this.keysForHighScores[k], tempArray[j].toString());
                            k++;
                        }
                        break;
                    }

                }
            }
        }

    }
}