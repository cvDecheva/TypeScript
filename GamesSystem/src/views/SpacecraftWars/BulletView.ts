module GamesPackage {
    export class BulletView extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'rocket');
            this.game.physics.enable(this);
            this.body.velocity.y = -200;
            this.angle = -90;
            this.anchor.setTo(0.5, 0.5);
        }

    }
}
