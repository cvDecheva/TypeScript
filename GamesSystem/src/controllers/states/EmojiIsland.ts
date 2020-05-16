/// <reference path = "../../../lib/phaser.d.ts"/>
module GamesPackage {
    export class EmojiIsland extends Phaser.State {

        private pauseController: PauseController;
        private emojiIslandModel: EmojiIslandModel;
        private levelController: LevelController;

        private level: number;

        init(level: number) {
            this.level = level;
        }

        create() {
            this.levelController = new LevelController(this.game, this.level);
            this.emojiIslandModel = new EmojiIslandModel();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.checkCollision.down = false;

            this.emojiIslandModel.bg = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "bg" + this.level.toString());
            this.emojiIslandModel.bg.anchor.set(0.5);
            this.emojiIslandModel.bg.width = this.game.width;
            this.emojiIslandModel.bg.height = this.game.height;

            this.emojiIslandModel.platform = new PlatformView(this.game);
            this.emojiIslandModel.target = new TargetView(this.game, this.levelController.levelStructure);
            this.emojiIslandModel.ball = new BallView(this.game);

            this.pauseController = new PauseController(this.game, EMOJI_ISLAND_MAP_STATE);
        }

        update() {
            this.emojiIslandModel.platform.update();

            if (this.emojiIslandModel.ball.isBallOnPlatform) {
                this.emojiIslandModel.ball.body.x = this.emojiIslandModel.platform.x;
            }
            else {
                this.game.physics.arcade.collide(this.emojiIslandModel.ball, this.emojiIslandModel.platform,
                    this.ballHitPaddle, null, this);
                this.game.physics.arcade.collide(this.emojiIslandModel.ball, this.emojiIslandModel.target,
                    this.ballHitBrick, null, this);
            }
        }

        ballHitBrick(ball, brick) {
            brick.kill();
            // score += 10;
            // scoreText.text = 'score: ' + score;

            if (this.emojiIslandModel.target.countLiving() == 0) {
                // score += 1000;
                // scoreText.text = 'score: ' + score;
                // introText.text = '- Next Level -';

                this.emojiIslandModel.ball.isBallOnPlatform = true;
                ball.body.velocity.set(0);
                ball.x = this.emojiIslandModel.platform.x + 16;
                ball.y = this.emojiIslandModel.platform.y - 16;
                ball.animations.stop();

            }

        }

        ballHitPaddle(ball, paddle) {
            let diff = 0;

            if (ball.x < paddle.x) {
                diff = paddle.x - ball.x;
                ball.body.velocity.x = (-10 * diff * 0.5);
            } else if (ball.x > paddle.x) {
                diff = ball.x - paddle.x;
                ball.body.velocity.x = (10 * diff * 0.5);
            }
            else {
                ball.body.velocity.x = 2 + Math.random() * 8;
            }

        }


    }
}