module GamesPackage {
    export class SpacecraftView extends Phaser.Sprite {

        public countOfBullets: number;
        public bullets: Array<BulletView>;

        constructor(game: Phaser.Game) {
            super(game, game.world.centerX, game.height, 'ship');
            this.position.y = this.game.height - this.height / 2;
            this.bullets = [];
            this.angle = -90;
            this.anchor.setTo(0.5, 0.5);
            this.countOfBullets = 3;
        }

        public shoot(): BulletView {
            if (this.countOfBullets > 0) {
                let bullet: BulletView = new BulletView(this.game, this.position.x, this.position.y);
                this.game.physics.arcade.enable(bullet);
                this.bullets.push(bullet);
                this.countOfBullets--;
                return bullet;
            }
            return null;
        }

        public move(direction: number): boolean {
            if ((direction > 0 && this.position.x <= this.game.world.width - this.width / 2) ||
                (direction < 0 && this.position.x >= this.width / 2 - 5)) {
                this.position.x += direction;
                return true;
            }
            return false;
        }

        public destroy() {
            this.countOfBullets = null;
            this.bullets = null;
        }

    }
}