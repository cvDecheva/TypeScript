module GamesPackage {
    export class TetrisSplashScreen extends Phaser.Stage {

        private logo: Phaser.Image;

        create() {
            this.logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "tetrisLogo");
            this.logo.anchor.set(0.5);

            this.game.add.tween(this.logo).from( { alpha: 0 }, 2000, Phaser.Easing.Bounce.Out, true);

            this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                this.game.state.start(TETRIS_STATE);
            }, this);

        }

    }
}