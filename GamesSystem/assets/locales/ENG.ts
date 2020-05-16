///<reference path="../../src/models/Language.ts"/>
module GamesPackage {
    export class ENG extends Language{

        constructor() {
            super("PLAY", "CONTINUE", "YOUR SCORE: ", "HIGH SCORES: ", "DIFFICULTY: ", "EASY", "MEDIUM", "HARD",
                "SCORE: ", "ROCKETS: ");
        }

    }
}