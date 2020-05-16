/// <reference path = "../../../lib/phaser.d.ts"/>

module GamesPackage {
    export class Tetris extends Phaser.State {

        private pauseController: PauseController;
        private interface: Interface;
        private shape: ShapeView;
        private currentDifficulty: Difficulty;

        private scoreLabel: Phaser.Text;
        private difficultyLabel: Phaser.Text;

        private leftKey: Phaser.Key;
        private rightKey: Phaser.Key;
        private spaceKey: Phaser.Key;
        private downKey: Phaser.Key;

        private allSquares: Array<Phaser.Sprite>;

        private score: number;

        create() {
            this.currentDifficulty = Difficulty.EASY;
            this.score = 0;
            this.allSquares = [];
            this.game.stage.backgroundColor = "#afffff";

            this.interface = new Interface(this.game);

            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

            this.shape = new ShapeView(this.game, Math.round(Math.random() * 6) + 1);

            this.leftKey.onUp.add(() => {
                this.shape.moveLeft(this.allSquares);
            }, this.shape);
            this.rightKey.onUp.add(() => {
                this.shape.moveRight(this.allSquares);
            }, this.shape);
            this.spaceKey.onUp.add(() => {
                this.shape.rotate(this.allSquares.concat(this.interface.sides));
            }, this.shape);

            this.downKey.onUp.add(() => {
                this.shape.moveDown(this.allSquares);
            }, this.shape);

            this.game.time.events.loop(Phaser.Timer.SECOND * 0.3, this.shape.moveDown, this.shape, this.allSquares);
            this.shape.onDownShapeEvent.add(this.createNextShape, this);

            this.createTexts();

            this.pauseController = new PauseController(this.game, TETRIS_STATE);
        }

        createTexts() {
            let difficulty: string;

            if (this.currentDifficulty == 0) {
                difficulty = language.EASY;
            } else if (this.currentDifficulty == 1) {
                difficulty = language.MEDIUM;
            } else {
                difficulty = language.HARD;
            }

            this.scoreLabel = this.game.add.text(this.game.width * 0.8, this.game.height * 0.4, language.SCORE + <string><any>this.score,
                {font: "34px Comic Sans MS", fill: "#0040FF"});
            this.scoreLabel.anchor.set(0.5);
            this.difficultyLabel = this.game.add.text(this.game.width * 0.8, this.game.height * 0.7, language.DIFFICULTY
                + difficulty, {font: "34px Comic Sans MS", fill: "#0040FF"});
            this.difficultyLabel.anchor.set(0.5);
        }

        public updateLabel(label: Phaser.Text, description: string, value: number | string): void {
            label.text = description + <string><any>value;
        }

        createNextShape() {
            for (let i = 0; i < this.shape.shape.length; i++) {
                if (this.shape.shape[i].position.y == 2 * 225 * SQUARE_SCALE) {
                    this.game.state.start(HIGH_SCORE_STATE, false, true, this.game.state.current, this.score);
                }
            }

            for (let i = 0; i < this.shape.shape.length; i++) {
                this.allSquares.push(this.shape.shape[i]);
            }

            this.checkForRow();
            this.shape.createShape(Math.round(Math.random() * 6) + 1);
        }

        checkForRow() {
            let squaresInRow: Array<Phaser.Sprite> = [];

            for (let i = 2; i < 22; i++) {
                squaresInRow = [];

                for (let j = 0; j < this.allSquares.length; j++) {
                    if (this.allSquares[j].position.y == 225 * SQUARE_SCALE * i) {
                        squaresInRow.push(this.allSquares[j]);
                    }
                }

                if (squaresInRow.length == 10) {
                    if (this.currentDifficulty == Difficulty.EASY) {
                        this.score += 50;
                    } else if (this.currentDifficulty == Difficulty.MEDIUM) {
                        this.score += 100;
                    } else {
                        this.score += 150;
                    }

                    this.updateLabel(this.scoreLabel, "Score: ", this.score);

                    if (this.score >= 300) {
                        this.currentDifficulty = Difficulty.MEDIUM;
                        this.updateLabel(this.difficultyLabel, "Difficulty: ", Difficulty[this.currentDifficulty]);
                    } else if (this.score >= 1000) {
                        this.currentDifficulty = Difficulty.HARD;
                        this.updateLabel(this.difficultyLabel, "Difficulty: ", Difficulty[this.currentDifficulty]);
                    }

                    for (let k = 0; k < this.allSquares.length; k++) {
                        if (this.allSquares[k].position.y == 225 * SQUARE_SCALE * i) {
                            this.allSquares[k].destroy();
                            this.allSquares[k] == null;
                            this.allSquares.splice(k, 1);
                            k--;
                        } else if (this.allSquares[k].position.y < 225 * SQUARE_SCALE * i) {
                            this.allSquares[k].position.y += 225 * SQUARE_SCALE;
                        }
                    }
                }
            }
        }

    }
}