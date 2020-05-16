module GamesPackage {
    export class LevelController {

        private levelsData: any;

        private game: Phaser.Game;

        public levelStructure: Array<Array<number>>;

        constructor(game: Phaser.Game, level: number) {
            this.game = game;

            this.levelsData = this.game.cache.getJSON('levels');
            this.levelStructure = this.levelsData.levels[level - 1];
        }

    }
}