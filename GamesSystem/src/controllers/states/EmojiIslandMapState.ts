module GamesPackage {
    export class EmojiIslandMapState extends Phaser.State{

        private bg: Phaser.Image;

        private levels: Array<Phaser.Image>;

        create() {
            this.bg = this.game.add.image(0, 0, "map");
            this.bg.scale.set(0.6);

            this.levels = [];

            this.levels.push(this.game.add.image(this.game.width * 0.2, this.game.height * 0.77, "level1"));
            this.levels[this.levels.length - 1].scale.set(0.08);
            this.levels[this.levels.length - 1].inputEnabled = true;
            this.levels[this.levels.length - 1].events.onInputDown.add(() => {
                this.game.state.start(EMOJI_ISLAND_STATE, true, null, 1);
            }, this);

            this.levels.push(this.game.add.image(this.game.width * 0.4, this.game.height * 0.7, "level2"));
            this.levels[this.levels.length - 1].scale.set(0.04);
            this.levels[this.levels.length - 1].inputEnabled = true;
            this.levels[this.levels.length - 1].events.onInputDown.add(() => {
                this.game.state.start(EMOJI_ISLAND_STATE, true, null, 2);
            }, this);

            this.levels.push(this.game.add.image(this.game.width * 0.6, this.game.height * 0.6, "level3"));
            this.levels[this.levels.length - 1].scale.set(0.04);
            this.levels[this.levels.length - 1].inputEnabled = true;
            this.levels[this.levels.length - 1].events.onInputDown.add(() => {
                this.game.state.start(EMOJI_ISLAND_STATE, true, null, 3);
            }, this);

        }

    }
}