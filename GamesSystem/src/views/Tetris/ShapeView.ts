module GamesPackage {
    export class ShapeView extends Phaser.Group {

        public onDownShapeEvent: Phaser.Signal;

        public down: number;
        public shape: Array<Phaser.Sprite>;
        public shapeType: number;
        public currentState: number;

        constructor(game: Phaser.Game, shapeType: number) {
            super(game);

            this.onDownShapeEvent = new Phaser.Signal();

            this.createShape(shapeType);
        }

        moveRight(allSquares: Array<Phaser.Sprite>) {
            let isColliding = false;
            let theMostRightPart: number = 0;

            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < allSquares.length; j++) {
                    if (this.shape[i].position.y == allSquares[j].position.y &&
                        (this.shape[i].position.x + 225 * SQUARE_SCALE) == allSquares[j].position.x) {
                        isColliding = true;
                    }
                }
            }

            for (let i = 0; i < this.shape.length; i++) {
                if (this.shape[i].position.x > theMostRightPart) {
                    theMostRightPart = this.shape[i].position.x;
                }
            }

            if (theMostRightPart < 225 * SQUARE_SCALE * 12 && isColliding == false) {
                for (let i = 0; i < this.shape.length; i++) {
                    this.shape[i].position.x += 225 * SQUARE_SCALE;
                }
            }
        }

        moveLeft(allSquares: Array<Phaser.Sprite>) {
            let isColliding = false;
            let theMostLeftPoint: number = this.shape[0].position.x;

            for (let i = 0; i < this.shape.length; i++) {
                if (this.shape[i].position.x < theMostLeftPoint) {
                    theMostLeftPoint = this.shape[i].position.x;
                }
            }

            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < allSquares.length; j++) {
                    if (this.shape[i].position.y == allSquares[j].position.y &&
                        (this.shape[i].position.x - 225 * SQUARE_SCALE) == allSquares[j].position.x) {
                        isColliding = true;
                    }
                }
            }

            if (theMostLeftPoint > 3 * 255 * SQUARE_SCALE + 1 && isColliding == false) {
                for (let i = 0; i < this.shape.length; i++) {
                    this.shape[i].position.x -= 225 * SQUARE_SCALE;
                }
            }
        }

        moveDown(allSquares: Array<Phaser.Sprite>) {
            let theMostBottomPart: number = 0;
            let isColliding = false;

            for (let i = 0; i < this.shape.length; i++) {
                if (this.shape[i].position.y > theMostBottomPart) {
                    theMostBottomPart = this.shape[i].position.y;
                }
            }

            for (let i = 0; i < this.shape.length; i++) {
                for (let j = 0; j < allSquares.length; j++) {
                    if (this.shape[i].position.x == allSquares[j].position.x &&
                        (this.shape[i].position.y + 225 * SQUARE_SCALE) == allSquares[j].position.y) {
                        isColliding = true;
                    }
                }
            }

            if (theMostBottomPart < 225 * SQUARE_SCALE * 21 && isColliding == false) {
                for (let i = 0; i < this.shape.length; i++) {
                    this.shape[i].position.y += 225 * SQUARE_SCALE;
                }
            } else {
                this.down++;
            }

            if (this.down == 2) {
                this.onDownShapeEvent.dispatch();
            }
        }

        rotate(allSquares: Array<Phaser.Sprite>) {
            let tempShape: Array<Phaser.Point> = [];
            this.shape.forEach((element) => {
                tempShape.push(new Phaser.Point(element.x, element.y));
            });
            let theMostLeftPart: Phaser.Point;
            let theMostRightPart: Phaser.Point;
            let isColliding: boolean = false;

            switch (this.shapeType) {
                //O O
                //O O
                case 1:
                    break;
                //O
                case 2:
                    break;
                //             O
                //O O O O      O
                //             O
                //             O
                case 3: {
                    if (this.currentState == 1) {
                        this.currentState++;

                        this.shape[0].x += 225 * SQUARE_SCALE;
                        this.shape[0].y -= 225 * SQUARE_SCALE;
                        this.shape[2].x -= 225 * SQUARE_SCALE;
                        this.shape[2].y += 225 * SQUARE_SCALE;
                        this.shape[3].x -= 2 * 225 * SQUARE_SCALE;
                        this.shape[3].y += 2 * 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 2 * 225 * SQUARE_SCALE;
                        })
                    } else {
                        this.currentState = 1;

                        tempShape[0].x -= 225 * SQUARE_SCALE;
                        tempShape[0].y += 225 * SQUARE_SCALE;
                        tempShape[2].x += 225 * SQUARE_SCALE;
                        tempShape[2].y -= 225 * SQUARE_SCALE;
                        tempShape[3].x += 2 * 225 * SQUARE_SCALE;
                        tempShape[3].y -= 2 * 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < tempShape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (tempShape[i].y == allSquares[j].position.y &&
                                        tempShape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 0) {
                                            tempShape.forEach((element) => {
                                                element.x += 225 * SQUARE_SCALE;
                                            })
                                        } else if (i == 2) {
                                            tempShape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        } if (i == 3) {
                                            tempShape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br > 2) {
                            this.currentState--;
                        } else {
                            for (let i = 0; i < tempShape.length; i++) {
                                this.shape[i].x = tempShape[i].x;
                                this.shape[i].y = tempShape[i].y;
                            }
                        }
                    }
                }
                    ;
                    break;
                //O O       O
                //  O O   O O
                //        O
                case
                4
                : {
                    if (this.currentState == 1) {
                        this.currentState++;

                        this.shape[0].x += 2 * 225 * SQUARE_SCALE;
                        this.shape[1].y += 2 * 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 225 * SQUARE_SCALE;
                        })
                    } else {
                        this.currentState = 1;

                        tempShape[0].x -= 2 * 225 * SQUARE_SCALE;
                        tempShape[1].y -= 2 * 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < tempShape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (tempShape[i].y == allSquares[j].position.y &&
                                        tempShape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 0) {
                                            tempShape.forEach((element) => {
                                                element.x += 225 * SQUARE_SCALE;
                                            })
                                        } else if (i == 2) {
                                            tempShape.forEach((element) => {
                                                element.x -= 2 * 225 * SQUARE_SCALE;
                                            })
                                        } else {
                                            tempShape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br > 1) {
                            this.currentState--;
                        } else {
                            for (let i = 0; i < tempShape.length; i++) {
                                this.shape[i].x = tempShape[i].x;
                                this.shape[i].y = tempShape[i].y;
                            }
                        }
                    }
                }
                    ;
                    break;
                //  O O    O
                //O O      O O
                //           O
                case
                5
                : {
                    if (this.currentState == 1) {
                        this.currentState++;

                        this.shape[2].y += 2 * 225 * SQUARE_SCALE;
                        this.shape[3].x -= 2 * 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 225 * SQUARE_SCALE;
                        })
                    } else {
                        this.currentState = 1;

                        tempShape[2].y -= 2 * 225 * SQUARE_SCALE;
                        tempShape[3].x += 2 * 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < tempShape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (tempShape[i].y == allSquares[j].position.y &&
                                        tempShape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 3) {
                                            tempShape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br > 1) {
                            this.currentState--;
                        } else {
                            for (let i = 0; i < tempShape.length; i++) {
                                this.shape[i].x = tempShape[i].x;
                                this.shape[i].y = tempShape[i].y;
                            }
                        }
                    }
                }
                    ;
                    break;
                //О О       О   О
                //  О   О О О   О     О О О
                //  О           О О   О
                case
                6
                : {
                    if (this.currentState == 1) {
                        this.currentState++;

                        this.shape[0].x += 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x += 225 * SQUARE_SCALE;
                        this.shape[1].y += 225 * SQUARE_SCALE;
                        this.shape[3].x -= 225 * SQUARE_SCALE;
                        this.shape[3].y -= 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < this.shape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (this.shape[i].y == allSquares[j].position.y &&
                                        this.shape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 0) {
                                            this.shape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br == 3) {
                            this.rotate(allSquares);
                        } else if (br > 3) {
                            this.currentState--;

                            this.shape[0].x -= 2 * 225 * SQUARE_SCALE;
                            this.shape[1].x -= 225 * SQUARE_SCALE;
                            this.shape[1].y -= 225 * SQUARE_SCALE;
                            this.shape[3].x += 225 * SQUARE_SCALE;
                            this.shape[3].y += 225 * SQUARE_SCALE;

                            this.shape.forEach((element) => {
                                element.x += 225 * SQUARE_SCALE;
                            })
                        }
                    }
                    else if (this.currentState == 2) {
                        this.currentState++;

                        this.shape[0].y += 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x -= 225 * SQUARE_SCALE;
                        this.shape[1].y += 225 * SQUARE_SCALE;
                        this.shape[3].x += 225 * SQUARE_SCALE;
                        this.shape[3].y -= 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 225 * SQUARE_SCALE;
                        })
                    } else if (this.currentState == 3) {
                        this.currentState++;

                        this.shape[0].x -= 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x -= 225 * SQUARE_SCALE;
                        this.shape[1].y -= 225 * SQUARE_SCALE;
                        this.shape[3].x += 225 * SQUARE_SCALE;
                        this.shape[3].y += 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < this.shape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (this.shape[i].y == allSquares[j].position.y &&
                                        this.shape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 0) {
                                            this.shape.forEach((element) => {
                                                element.x += 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br == 3) {
                            this.rotate(allSquares);
                        }
                    } else {
                        this.currentState = 1;

                        this.shape[0].y -= 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x += 225 * SQUARE_SCALE;
                        this.shape[1].y -= 225 * SQUARE_SCALE;
                        this.shape[3].x -= 225 * SQUARE_SCALE;
                        this.shape[3].y += 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 225 * SQUARE_SCALE;
                        })
                    }
                }
                    ;
                    break;
                //О О             О   О
                //О     О О О     О   О О О
                //О         О   О О
                case
                7
                : {
                    if (this.currentState == 1) {
                        this.currentState++;

                        this.shape[0].y += 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x += 225 * SQUARE_SCALE;
                        this.shape[1].y += 225 * SQUARE_SCALE;
                        this.shape[3].x -= 225 * SQUARE_SCALE;
                        this.shape[3].y -= 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < this.shape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (this.shape[i].y == allSquares[j].position.y &&
                                        this.shape[i].x == allSquares[j].position.x) {
                                        br++;

                                        if (i == 3) {
                                            this.shape.forEach((element) => {
                                                element.x += 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br == 3) {
                            this.rotate(allSquares);
                        } else if (br > 3) {
                            this.currentState--;

                            this.shape[0].y -= 2 * 225 * SQUARE_SCALE;
                            this.shape[1].x -= 225 * SQUARE_SCALE;
                            this.shape[1].y -= 225 * SQUARE_SCALE;
                            this.shape[3].x += 225 * SQUARE_SCALE;
                            this.shape[3].y += 225 * SQUARE_SCALE;

                            this.shape.forEach((element) => {
                                element.x -= 225 * SQUARE_SCALE;
                            })
                        }
                    } else if (this.currentState == 2) {
                        this.currentState++;

                        this.shape[0].x -= 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x -= 225 * SQUARE_SCALE;
                        this.shape[1].y += 225 * SQUARE_SCALE;
                        this.shape[3].x += 225 * SQUARE_SCALE;
                        this.shape[3].y -= 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < this.shape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (this.shape[i].y == allSquares[j].position.y &&
                                        this.shape[i].x == allSquares[j].position.x) {
                                        br++;
                                        console.log(i);
                                    }
                                }
                            }
                        }
                        console.log(br);

                        if (br == 2) {
                            this.currentState--;

                            this.shape[0].x += 2 * 225 * SQUARE_SCALE;
                            this.shape[1].x += 225 * SQUARE_SCALE;
                            this.shape[1].y -= 225 * SQUARE_SCALE;
                            this.shape[3].x -= 225 * SQUARE_SCALE;
                            this.shape[3].y += 225 * SQUARE_SCALE;
                        }
                    } else if (this.currentState == 3) {
                        this.currentState++;

                        this.shape[0].y -= 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x -= 225 * SQUARE_SCALE;
                        this.shape[1].y -= 225 * SQUARE_SCALE;
                        this.shape[3].x += 225 * SQUARE_SCALE;
                        this.shape[3].y += 225 * SQUARE_SCALE;

                        let br = 0;
                        for (let k = 0; k < 2; k++) {
                            for (let i = 0; i < this.shape.length; i++) {
                                for (let j = 0; j < allSquares.length; j++) {
                                    if (this.shape[i].y == allSquares[j].position.y &&
                                        this.shape[i].x == allSquares[j].position.x) {
                                        br++;
                                        console.log(i);
                                        if (i == 3) {
                                            this.shape.forEach((element) => {
                                                element.x -= 225 * SQUARE_SCALE;
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        if (br == 3) {
                            this.rotate(allSquares);
                        }
                    } else {
                        this.currentState = 1;

                        this.shape[0].x += 2 * 225 * SQUARE_SCALE;
                        this.shape[1].x += 225 * SQUARE_SCALE;
                        this.shape[1].y -= 225 * SQUARE_SCALE;
                        this.shape[3].x -= 225 * SQUARE_SCALE;
                        this.shape[3].y += 225 * SQUARE_SCALE;

                        this.shape.forEach((element) => {
                            element.y -= 225 * SQUARE_SCALE;
                        })
                    }
                }
                    ;
                    break;
            }
        }

        createSquare(color: number, x, y): Phaser.Sprite {
            let square = this.game.add.sprite(x, y, "square");

            square.tint = color;
            square.scale.set(SQUARE_SCALE);

            return square;
        }

        createShape(shapeType: number) {
            this.down = 0;
            this.shape = [];
            this.shapeType = shapeType;
            this.currentState = 1;

            switch (this.shapeType) {
                //O O
                //O O
                case 1: {
                    let a = this.createSquare(YELLOW, 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                    let b = this.createSquare(YELLOW, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(b);
                    let c = this.createSquare(YELLOW, 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(c);
                    let d = this.createSquare(YELLOW, 2 * 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(d);
                }
                    ;
                    break;
                //O
                case 2: {
                    let a = this.createSquare(RED, 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                }
                    ;
                    break;
                //O O O O
                case 3: {
                    let a = this.createSquare(GREEN, 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                    let b = this.createSquare(GREEN, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(b);
                    let c = this.createSquare(GREEN, 3 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(c);
                    let d = this.createSquare(GREEN, 4 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(d);
                }
                    ;
                    break;
                //O O
                //  O O
                case 4: {
                    let a = this.createSquare(ORANGE, 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                    let b = this.createSquare(ORANGE, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(b);
                    let c = this.createSquare(ORANGE, 2 * 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(c);
                    let d = this.createSquare(ORANGE, 3 * 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(d);
                }
                    ;
                    break;
                //  O O
                //O O
                case 5: {
                    let a = this.createSquare(BLUE, 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(a);
                    let b = this.createSquare(BLUE, 2 * 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(b);
                    let c = this.createSquare(BLUE, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(c);
                    let d = this.createSquare(BLUE, 3 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(d);
                }
                    ;
                    break;
                //О О       О   О
                //  О   О О О   О     О О О
                //  О           О О   О
                case 6: {
                    let a = this.createSquare(PINK, 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                    let b = this.createSquare(PINK, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(b);
                    let c = this.createSquare(PINK, 2 * 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(c);
                    let d = this.createSquare(PINK, 2 * 225 * SQUARE_SCALE, 2 * 225 * SQUARE_SCALE);
                    this.shape.push(d);
                }
                    ;
                    break;
                //О О             О   О
                //О     О О О     О   О О О
                //О         О   О О
                case 7: {
                    let a = this.createSquare(PURPLE, 2 * 225 * SQUARE_SCALE, 0);
                    this.shape.push(a);
                    let b = this.createSquare(PURPLE, 225 * SQUARE_SCALE, 0);
                    this.shape.push(b);
                    let c = this.createSquare(PURPLE, 225 * SQUARE_SCALE, 225 * SQUARE_SCALE);
                    this.shape.push(c);
                    let d = this.createSquare(PURPLE, 225 * SQUARE_SCALE, 2 * 225 * SQUARE_SCALE);
                    this.shape.push(d);
                }
                    ;
                    break;
            }

            this.shape.forEach((element) => {
                element.x += 6 * 225 * SQUARE_SCALE;
            })
        }

    }
}