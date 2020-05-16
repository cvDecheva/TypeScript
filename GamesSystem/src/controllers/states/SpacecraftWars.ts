module GamesPackage {
    export class SpacecraftWars extends Phaser.State {

        private score: number;
        private delay: number;
        private startCounter: number;
        private countOfRocks: number;
        private velocityOfObstacleGroup: number;

        private pauseController: PauseController;
        private ship: SpacecraftView;
        private obstacles: Array<ObstacleView>;
        private powerUps: Array<PowerUpView>;

        private currentDifficulty: Difficulty;
        private inputHandler: InputHandler;
        private background: Background;

        private obstacleLoopTimer: Phaser.TimerEvent;
        private addScoreTimer: Phaser.TimerEvent;
        private powerUpLoopTimer: Phaser.TimerEvent;

        private scoreLabel: Phaser.Text;
        private countOfBulletLabel: Phaser.Text;
        private difficultyLabel: Phaser.Text;

        private backgroundLayer: Phaser.Group;
        private objectsLayer: Phaser.Group;
        private labelsLayer: Phaser.Group;

        private rocketButton: Phaser.Button;

        create() {
            this.currentDifficulty = Difficulty.EASY;
            this.game.stage.backgroundColor = BLACK_STR;

            this.backgroundLayer = this.game.add.group();
            this.objectsLayer = this.game.add.group();
            this.labelsLayer = this.game.add.group();

            this.velocityOfObstacleGroup = 4;
            this.score = 0;
            this.startCounter = 0;
            this.countOfRocks = Math.floor(this.game.width / (this.game.cache.getImage('rock').width));

            this.powerUps = [];

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.background = new Background(this.game);
            this.backgroundLayer.add(this.background);

            this.obstacles = [];
            this.obstacles.push(new ObstacleView(this.game, this.getCurrentVelocity(),
                this.getFromValueForRandom(), this.getToValueForRandom(), this.countOfRocks));
            this.objectsLayer.add(this.obstacles[0]);

            this.ship = new SpacecraftView(this.game);
            this.game.add.existing(this.ship);
            this.game.physics.arcade.enable(this.ship);
            this.objectsLayer.add(this.ship);

            this.delay = 2000;
            this.obstacleLoopTimer = this.game.time.events.loop(this.delay, this.addRowOfRocks, this);
            this.addScoreTimer = this.game.time.events.loop(this.delay, this.addPoints, this);
            this.powerUpLoopTimer = this.game.time.events.loop(400, this.addPowerUp, this);

            this.inputHandler = new InputHandler(this.game);
            //this.inputHandler.spaceKeyEvent.add(this.shoot, this);

            this.setPlayLabels();

            this.rocketButton = this.game.add.button(this.game.width - this.game.cache.getImage('rocket').height * 2, this.game.height / 2, 'rocket',
                this.shoot, this, 1);
            this.rocketButton.anchor.set(0);
            this.rocketButton.scale.set(2);
            this.rocketButton.angle = -90;
            this.labelsLayer.add(this.rocketButton);

            this.pauseController = new PauseController(this.game, SPACECRAFT_WARS_STATE);
        }

        update() {
            for (var i = 0; i < this.obstacles.length; i++) {
                this.obstacles[i].position.y += this.velocityOfObstacleGroup;
            }

            this.background.update();
            this.inputHandler.update(this.ship, this.background);
            this.startCounter++;

            this.game.physics.arcade.overlap(this.ship, this.obstacles, this.collisionPlayerObsticle, null, this);
            this.game.physics.arcade.overlap(this.ship, this.powerUps, this.collisionPlayerPowerUp, null, this);
            this.game.physics.arcade.overlap(this.obstacles, this.powerUps, this.collisionObstaclePowerUp, null, this);
            this.game.physics.arcade.overlap(this.obstacles, this.ship.bullets, this.collisionBulletObstacle, null, this);
        }

        // shutdown() {
        //     this.score = null;
        //     this.delay = null;
        //     this.startCounter = null;
        //     this.countOfRocks = null;
        //     this.velocityOfObstacleGroup = null;
        //
        //     this.ship.destroy();
        //     this.ship = null;
        //     for (var i = 0; i < this.obstacles.length; i++) {
        //         this.obstacles[i].destroy();
        //         this.obstacles[i] = null;
        //     }
        //     for (var i = 0; i < this.powerUps.length; i++) {
        //         this.powerUps[i].destroy();
        //         this.powerUps[i] = null;
        //     }
        //
        //     this.currentDifficulty = null;
        //     this.inputHandler.destroy();
        //     this.inputHandler = null;
        //     this.background.destroy();
        //     this.background = null;
        //
        //     this.game.time.events.remove(this.obstacleLoopTimer);
        //     this.obstacleLoopTimer = null;
        //     this.game.time.events.remove(this.powerUpLoopTimer);
        //     this.powerUpLoopTimer = null;
        //     this.game.time.events.remove(this.addScoreTimer);
        //     this.addScoreTimer = null;
        //
        //     this.scoreLabel.destroy();
        //     this.scoreLabel = null;
        //     this.countOfBulletLabel.destroy();
        //     this.countOfBulletLabel = null;
        //     this.difficultyLabel.destroy();
        //     this.difficultyLabel = null;
        //
        //     this.backgroundLayer.destroy();
        //     this.backgroundLayer = null;
        //     this.objectsLayer.destroy();
        //     this.objectsLayer = null;
        //     this.labelsLayer.destroy();
        //     this.labelsLayer = null;
        //
        //     this.rocketButton.destroy();
        //     this.rocketButton = null;
        // }

        public setPlayLabels() {
            let difficulty: string;

            if (this.currentDifficulty == 0) {
                difficulty = language.EASY;
            } else if (this.currentDifficulty == 1) {
                difficulty = language.MEDIUM;
            } else {
                difficulty = language.HARD;
            }

            this.countOfBulletLabel = new Phaser.Text(this.game, 10, 10, language.ROCKETS + <string><any>this.ship.countOfBullets,
                {font: "30px Comic Sans MS", fill: WHITE_STR});
            this.scoreLabel = new Phaser.Text(this.game, this.game.width * 3 / 4, 10, language.SCORE + <string><any>this.score,
                {font: "30px Comic Sans MS", fill: WHITE_STR});
            this.difficultyLabel = new Phaser.Text(this.game, this.game.width * 2 / 3, this.game.height - 10, language.DIFFICULTY
                + difficulty, {font: "24px Comic Sans MS", fill: WHITE_STR});
            this.difficultyLabel.anchor.set(0, 1);
            
            this.labelsLayer.add(this.countOfBulletLabel);
            this.labelsLayer.add(this.scoreLabel);
            this.labelsLayer.add(this.difficultyLabel);
        }

        public updateLabel(label: Phaser.Text, description: string, value: number | string): void {
            label.text = description + <string><any>value;
        }

        public shoot(): void {
            let bullet: BulletView = this.ship.shoot();
            if (bullet != null) {
                this.objectsLayer.add(bullet);
            }
            this.updateLabel(this.countOfBulletLabel, language.ROCKETS, this.ship.countOfBullets);
        }

        public collisionObstaclePowerUp(obstacle: ObstacleView, powerUp: PowerUpView): void {
            powerUp.destroy();
        }

        public collisionBulletObstacle(bullet: BulletView, obstacle: ObstacleView): void {
            let obstacleGroup: ObstacleView;
            for (let i: number = 0; i < this.obstacles.length; i++) {
                if (this.obstacles[i].y === obstacle.parent.position.y) {

                    obstacleGroup = this.obstacles[i];
                }
            }
            this.ship.bullets.splice(this.ship.bullets.indexOf(bullet), 1);
            bullet.destroy();
            this.obstacles.splice(this.obstacles.indexOf(obstacleGroup), 1);
            obstacleGroup.destroy();
            this.score += 50;
            this.updateLabel(this.scoreLabel, language.SCORE, this.score);
            this.changeDifficulty();
        }

        public collisionPlayerObsticle(): void {
            this.game.state.start(HIGH_SCORE_STATE, false, true, this.game.state.current, this.score);
        }

        public collisionPlayerPowerUp(ship: SpacecraftView, powerUp: PowerUpView): void {
            this.ship.countOfBullets++;
            powerUp.destroy();
            this.updateLabel(this.countOfBulletLabel, language.ROCKETS, this.ship.countOfBullets);
        }

        public addRowOfRocks(): void {
            let obstacle = new ObstacleView(this.game, this.getFromValueForRandom(), this.getToValueForRandom(), this.countOfRocks)
            this.obstacles.push(obstacle);
            this.objectsLayer.add(obstacle);
        }

        public addPowerUp(): void {
            if (this.obstacles.length > 0) {
                let yOfLastGroup: number = this.obstacles[this.obstacles.length - 1].position.y;
                let x = Math.random() * (this.game.width - 100) + 50;
                if (this.startCounter % 15 === 0) {
                    if (yOfLastGroup >= 50 && yOfLastGroup <= 300) {
                        let powerUp: PowerUpView = new PowerUpView(this.game, x, 0, this.getCurrentVelocity());
                        this.powerUps.push(powerUp);
                        this.objectsLayer.add(powerUp);
                    }
                }
            }
        }

        public addPoints(): void {
            let obstacleGroup: ObstacleView;
            for (let i: number = 0; i < this.obstacles.length; i++) {
                if (this.obstacles[0].position.y > this.game.height) {
                    obstacleGroup = this.obstacles[0];
                    this.obstacles.splice(this.obstacles.indexOf(obstacleGroup), 1);
                    obstacleGroup.destroy();
                    this.score += 20;
                    this.updateLabel(this.scoreLabel, language.SCORE, this.score);
                }
            }
            this.changeDifficulty();
        }

        public getCurrentVelocity(): number {
            return 240 + 240 * this.currentDifficulty;
        }

        public getFromValueForRandom(): number {
            return this.countOfRocks - ((this.currentDifficulty + 1) * 2 + this.countOfRocks / 5);
        }

        public getToValueForRandom(): number {
            return this.countOfRocks - ((this.currentDifficulty + 1) * 2 + this.countOfRocks / 2);
        }

        public changeVelocityPowerUpsObstacles(): void {
            this.velocityOfObstacleGroup = 4 + 4 * this.currentDifficulty;
            for (var i = 0; i < this.powerUps.length; i++) {
                if (this.powerUps[i].body != null) {
                    this.powerUps[i].body.velocity.y = this.getCurrentVelocity();
                }
            }
        }

        public changeDifficulty(): void {
            if (this.score > 200 && this.score < 300) {
                this.currentDifficulty = Difficulty.MEDIUM;
                this.obstacleLoopTimer.delay = 1500;
                this.updateLabel(this.difficultyLabel, language.DIFFICULTY, language.MEDIUM);
                this.changeVelocityPowerUpsObstacles();
                this.background.changeVelocity(this.getCurrentVelocity());
            } else if (this.score >= 300) {
                this.currentDifficulty = Difficulty.HARD;
                this.obstacleLoopTimer.delay = 1000;
                this.updateLabel(this.difficultyLabel, language.DIFFICULTY, language.HARD);
                this.changeVelocityPowerUpsObstacles();
                this.background.changeVelocity(this.getCurrentVelocity());
            }
        }

    }
}