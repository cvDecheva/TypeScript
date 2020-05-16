module GamesPackage {
    export class BallView extends Phaser.Sprite {

        isBallOnPlatform: boolean;

        constructor(game) {
            super(game, game.world.centerX, game.height * 0.7, "ball");

            this.anchor.set(0.5);
            this.scale.set(0.05);
            this.checkWorldBounds = true;
            this.game.add.existing(this);

            this.game.physics.enable(this, Phaser.Physics.ARCADE);

            this.body.collideWorldBounds = true;
            this.body.bounce.set(1);

            this.isBallOnPlatform = true;
            this.events.onOutOfBounds.add(() => {
                this.game.state.start(GAME_OVER_STATE, false, true, EMOJI_ISLAND_MAP_STATE);
            }, this);
            this.releaseBall();
        }


        releaseBall() {
            if (this.isBallOnPlatform) {
                this.isBallOnPlatform = false;
                this.body.velocity.y = -300;
                this.body.velocity.x = -75;
            }
        }
    }
}