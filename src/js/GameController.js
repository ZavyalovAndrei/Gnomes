export default class GamePlay {
  constructor(fieldSize, goblinStartPosition) {
    this.fieldSize = fieldSize;
    this.gameContainer = document.querySelector(".field-container");
    this.goblinPosition = goblinStartPosition;
  }

  createField(){
    const fields = [];
      for (let i = 0; i < this.fieldSize; i++) {
        for (let j = 0; j < this.fieldSize; j++) {
          fields.push(`<div class="field" data-row="${i}" data-col="${j}"style="grid-row:${i + 1}">
          </div>`);
        }   
      }
    this.gameContainer.insertAdjacentHTML("afterbegin", fields.join(''));
    this.setOccuped(this.goblinPosition);
  }

  setOccuped(position) {
    const occupedField = document.querySelector(`.field[data-row="${position[0]}"][data-col="${position[1]}"]`);
    occupedField.classList.add("occuped");
    }

  setFree(position) {
    const occupedField = document.querySelector(`.field[data-row="${position[0]}"][data-col="${position[1]}"]`);
    occupedField.classList.remove("occuped")
  }

  changePosition(){
    while(true) {// eslint-disable-line
      const newPosition = [Math.round(Math.random() * (this.fieldSize - 1)), Math.round(Math.random() * (this.fieldSize - 1))];
      if (newPosition[0] != this.goblinPosition[0] && newPosition[1] != this.goblinPosition[1]) {
        this.setOccuped(newPosition);
        this.setFree(this.goblinPosition);
        this.goblinPosition = newPosition;
        return false;
      }
    }
  }
}