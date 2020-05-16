module GamesPackage {
    export class TargetView extends Phaser.Group {

        constructor(game, levelStructure: Array<Array<number>>) {
            super(game);

            this.enableBody = true;
            this.physicsBodyType = Phaser.Physics.ARCADE;
            this.game.add.existing(this);

            for (var y = 0; y < levelStructure.length; y++)
            {
                for (var x = 0; x < levelStructure[y].length; x++)
                {
                    if(levelStructure[y][x] != 0) {
                        let brick = this.create(0 + (x * 36), 0 + (y * 52), levelStructure[y][x].toString());
                        brick.body.bounce.set(1);
                        brick.width = 30;
                        brick.height = 30;
                        brick.body.immovable = true;
                    }
                }
            }
        }
    }
}