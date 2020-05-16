module GamesPackage {
    export class PlatformView extends Phaser.Sprite {

        constructor(game) {
            super(game, game.world.centerX, game.height * 0.8, "platform");

            this.anchor.set(0.5);
            this.scale.set(0.3);
            this.game.add.existing(this);

            game.physics.enable(this, Phaser.Physics.ARCADE);

            this.body.collideWorldBounds = true;
            this.body.bounce.set(1);
            this.body.immovable = true;
        }

        update () {
            this.x = this.game.input.x;

            if (this.x < this.width * 0.5) {
                this.x = this.width * 0.5;
            } else if (this.x > this.game.width - this.width * 0.5) {
                this.x = this.game.width - this.width * 0.5;
            }
        }
    }
}