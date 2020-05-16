module GamesPackage {
    export class ObstacleView extends Phaser.Group {

        private rocks: Array<Phaser.Sprite>;

        constructor(game: Phaser.Game, from: number, to: number, countOfRocks: number, y?: number) {
            super(game);

            this.rocks = [];
            this.addRowOfRocks(from, to, countOfRocks);
            this.game.physics.arcade.enable(this);

            if (y != null) {
                this.position.y = y;
            }
        }

        private addRock(x: number, y: number): void {
            let rock: Phaser.Sprite = new Phaser.Sprite(this.game, x, y, 'rock');
            this.add(rock);
            this.game.physics.arcade.enable(rock);
            this.rocks.push(rock);
        }

        public changeVelocity(velocity: number): void {
            for (let i: number = 0; i < this.rocks.length; i++) {
                if (this.rocks[i].body != null) {
                    this.rocks[i].body.velocity.y = velocity;
                }
            }
        }

        public addRowOfRocks(from: number, to: number, countOfRocks: number): void {
            let maxLengthOfHole: number = Math.floor(Math.random() * (from - to)) + to;
            let hole: number = Math.floor(Math.random() * (countOfRocks - maxLengthOfHole));
            let type: number = Math.floor(Math.random() * 2);
            if (type === 1) {
                for (let i: number = 0; i < countOfRocks; i++) {
                    if (i != hole) {
                        let x: number = i * 27 + 10;
                        let y: number = 0;
                        this.addRock(x, y);
                    }
                    else {
                        i += maxLengthOfHole;
                    }
                }
            }
            else if (type === 0) {
                for (let i: number = 0; i < countOfRocks; i++) {
                    if (i == hole) {
                        for (let j: number = 0; j < maxLengthOfHole; j++) {
                            let x: number = (i + j) * 27 + 10;
                            let y: number = 0;
                            this.addRock(x, y);
                        }
                        break;
                    }
                }
            }
        }

        public destroy() {
            super.destroy();

            for (var i = 0; i < this.rocks.length; i++) {
                this.rocks[i].destroy();
                this.rocks[i] = null;
            }

            this.rocks = [];
            this.rocks = null;

            super.destroy(true);
        }
    }
}