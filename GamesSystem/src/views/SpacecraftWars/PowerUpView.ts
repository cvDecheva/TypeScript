module GamesPackage {
    export class PowerUpView extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, velocity: number) {
            super(game, x, y, 'powerUp');
            game.physics.arcade.enable(this);
            this.body.velocity.y = velocity;
            game.add.existing(this);
        }

    }
}