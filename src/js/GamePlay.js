import GameController from "./GameController";

export default class GamePlay {
    constructor(fieldSize, delay) {
        this.fieldSize = fieldSize;
        this.goblinStartPosition = [1, 2];
        this.delay = delay;
        this.gameController = new GameController(this.fieldSize, this.goblinStartPosition);
        this.gameController.createField();
        setInterval(() => {this.gameController.changePosition()}, this.delay);
    }
}
