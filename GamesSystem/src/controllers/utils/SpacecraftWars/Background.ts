module GamesPackage {
    export class Background extends Phaser.Group {

        private SPACE_IMAGE_HEIGHT: number = 1453;

        private firstSpaceSprite: Phaser.Sprite;
        private secondSpaceSprite: Phaser.Sprite;

        constructor(game: Phaser.Game) {
            super(game);

            this.firstSpaceSprite = new Phaser.Sprite(this.game, this.game.world.centerX, 0, 'space');
            this.firstSpaceSprite.anchor.set(0.5, 0);
            this.firstSpaceSprite.width = this.game.width + this.game.width / 5;
            this.firstSpaceSprite.height = this.SPACE_IMAGE_HEIGHT;
            this.game.physics.enable(this.firstSpaceSprite);
            this.firstSpaceSprite.body.velocity.y = 420;
            this.add(this.firstSpaceSprite);

            this.secondSpaceSprite = new Phaser.Sprite(this.game, this.game.world.centerX, -this.SPACE_IMAGE_HEIGHT, 'space');
            this.secondSpaceSprite.anchor.set(0.5, 0);
            this.secondSpaceSprite.width = this.game.width + this.game.width / 5;
            this.secondSpaceSprite.height = this.SPACE_IMAGE_HEIGHT;
            this.game.physics.enable(this.secondSpaceSprite);
            this.secondSpaceSprite.body.velocity.y = 420;
            this.add(this.secondSpaceSprite);
        }

        update() {
            if (this.firstSpaceSprite.y >= this.SPACE_IMAGE_HEIGHT) {
                this.firstSpaceSprite.y = this.secondSpaceSprite.position.y - this.SPACE_IMAGE_HEIGHT;
            }

            if (this.secondSpaceSprite.y >= this.SPACE_IMAGE_HEIGHT) {
                this.secondSpaceSprite.y = this.firstSpaceSprite.position.y - this.SPACE_IMAGE_HEIGHT;
            }
        }

        destroy() {
            super.destroy();
            this.firstSpaceSprite.destroy();
            this.firstSpaceSprite = null;
            this.secondSpaceSprite.destroy();
            this.secondSpaceSprite = null;

            this.SPACE_IMAGE_HEIGHT = null;
        }

        public changeVelocity(velocity: number) {
            this.firstSpaceSprite.body.velocity.y = velocity;
            this.secondSpaceSprite.body.velocity.y = velocity;
        }

        public move(direction: number) {
            this.firstSpaceSprite.x += direction;
            this.secondSpaceSprite.x += direction;
        }
    }
}