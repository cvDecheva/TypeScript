module GamesPackage {
    const SHIP_MOVING: number = 5;
    const BACKGROUND_MOVING: number = 1;

    export class InputHandler {
        private game: Phaser.Game;

        constructor(game: Phaser.Game) {
            this.game = game;
        }

        update(ship: SpacecraftView, background: Background) {
            if (this.game.input.activePointer.isDown) {
                if (ship.position.x - SHIP_MOVING > this.game.input.activePointer.position.x) {
                    if (ship.move(-SHIP_MOVING)) {
                        background.move(-BACKGROUND_MOVING);
                    }
                }
                else if (ship.position.x + SHIP_MOVING < this.game.input.activePointer.position.x) {
                    if (ship.move(SHIP_MOVING)) {
                        background.move(BACKGROUND_MOVING);
                    }
                }
            }
        }

        public destroy() {


        }

    }
}