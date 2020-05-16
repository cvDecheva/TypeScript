module GamesPackage {
    export class EmojiIslandSplashScreen extends Phaser.Stage {

        private logo: Phaser.Image;

        create() {
            this.logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "logo");
            this.logo.anchor.set(0.5);

            this.game.add.tween(this.logo).from( { alpha: 0 }, 2000, Phaser.Easing.Bounce.Out, true);

            this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
                this.game.state.start(EMOJI_ISLAND_MAP_STATE);
            }, this);

        }

    }
}