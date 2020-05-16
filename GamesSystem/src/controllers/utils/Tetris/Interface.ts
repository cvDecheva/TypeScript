module GamesPackage {
    export class Interface {

        private game: Phaser.Game;

        public sides: Array<Phaser.Sprite>;

        constructor(game: Phaser.Game) {
            this.game = game;
            this.sides = [];

            for (let i = 2; i < 14; i++) {
                this.sides.push(this.createSquare(0xffffff, i * 225 * SQUARE_SCALE, game.height - 225 * SQUARE_SCALE));
            }

            for (let i = 2; i < 22; i++) {
                this.sides.push(this.createSquare(0xffffff, 2 * 225 * SQUARE_SCALE, i * 225 * SQUARE_SCALE));
            }

            for (let i = 2; i < 22; i++) {
                this.sides.push(this.createSquare(0xffffff, 13 * 225 * SQUARE_SCALE, i * 225 * SQUARE_SCALE));
            }
        }

        createSquare(color: number, x, y): Phaser.Sprite {
            let square = this.game.add.sprite(x, y, "square");

            square.tint = color;
            square.scale.set(SQUARE_SCALE);

            return square;
        }

    }
}
