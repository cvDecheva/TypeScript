/// <reference path = "../lib/phaser.d.ts"/>

module GamesPackage {
    declare let language: Language;

    class Games extends Phaser.Game {

        constructor(width?: number, height?: number) {
            super(width, height, Phaser.AUTO, 'phaser-div');

            this.state.add(PRELOAD_STATE, Preload, true);
            this.state.add(CHOOSE_GAME_STATE, ChooseGame, false);
            this.state.add(TETRIS_PRELOAD_STATE, TetrisSplashScreen, false);
            this.state.add(TETRIS_STATE, Tetris, false);
            this.state.add(EMOJI_ISLAND_STATE, EmojiIsland, false);
            this.state.add(EMOJI_ISLAND_PRELOAD_STATE, EmojiIslandSplashScreen, false);
            this.state.add(EMOJI_ISLAND_MAP_STATE, EmojiIslandMapState, false);
            this.state.add(SPACECRAFT_WARS_STATE, SpacecraftWars, false);
            //    this.state.add(SPACECRAFT_WARS_PRELOAD_STATE, SpacecraftWars, false);
            this.state.add(HIGH_SCORE_STATE, HighScoreState, false);
            this.state.add(GAME_OVER_STATE, GameOver, false);

            this.getLanguage();
        }

        getLanguage() {
            if (window.navigator.language == "bg" || window.navigator.language == "bg-BG") {
                language = new BG();
            } else {
                language = new ENG();
            }
        }

    }

    window.onload = () => {
        new Games(800, 225 * SQUARE_SCALE * 23);
    }
}