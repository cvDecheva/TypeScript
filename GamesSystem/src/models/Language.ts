module GamesPackage {
    export abstract class Language {

        public PLAY: string;
        public CONTINUE: string;
        public YOUR_SCORE: string;
        public HIGH_SCORES: string;
        public DIFFICULTY: string;
        public EASY: string;
        public MEDIUM: string;
        public HARD: string;
        public SCORE: string;
        public ROCKETS: string

        constructor(play: string, cont: string, yourScore: string, highScores: string, difficulty: string,
                    easy: string, medium: string, hard: string, score: string, rockest: string) {
            this.PLAY = play;
            this.CONTINUE = cont;
            this.YOUR_SCORE = yourScore;
            this.HIGH_SCORES = highScores;
            this.DIFFICULTY = difficulty;
            this.EASY = easy;
            this.MEDIUM = medium;
            this.HARD = hard;
            this.SCORE = score;
            this.ROCKETS = rockest;
        }

    }
}