import GamePlay from '../js/GamePlay.js';

describe('GamePlay', () => {
  describe('createField', () => {
    let gamePlay;
    const fieldSize = 5;
    const goblinStartPosition = [2, 2];

    beforeEach(() => {
      gamePlay = new GamePlay(fieldSize, goblinStartPosition);
      gamePlay.gameContainer = document.createElement('div');
      gamePlay.gameContainer.classList.add('field-container');
      document.body.appendChild(gamePlay.gameContainer);
    });

    afterEach(() => {
      document.body.removeChild(gamePlay.gameContainer);
    });

    test('should create a grid of fields with the correct size', () => {
      gamePlay.createField();
      const fields = gamePlay.gameContainer.querySelectorAll('.field');
      expect(fields.length).toBe(fieldSize * fieldSize);
    });

    test('should set the goblin position as occupied', () => {
      gamePlay.createField();
      const goblinField = gamePlay.gameContainer.querySelector(`.field[data-row="${goblinStartPosition[0]}"][data-col="${goblinStartPosition[1]}"]`);
      expect(goblinField.classList.contains('occuped')).toBe(true);
    });

    test('should set the grid-row style for each field', () => {
      gamePlay.createField();
      const fields = gamePlay.gameContainer.querySelectorAll('.field');
      fields.forEach((field, index) => {
        const expectedGridRow = index / fieldSize + 1;
        expect(field.style.gridRow).toBe(String(expectedGridRow));
      });
    });

    test('should not create any duplicate fields', () => {
      gamePlay.createField();
      const fields = gamePlay.gameContainer.querySelectorAll('.field');
      const fieldPositions = new Set();
      fields.forEach((field) => {
        const position = `${field.dataset.row}-${field.dataset.col}`;
        expect(fieldPositions.has(position)).toBe(false);
        fieldPositions.add(position);
      });
    });

    test('should not create any fields outside the specified field size', () => {
      gamePlay.createField();
      const fields = gamePlay.gameContainer.querySelectorAll('.field');
      fields.forEach((field) => {
        const row = parseInt(field.dataset.row);
        const col = parseInt(field.dataset.col);
        expect(row).toBeGreaterThanOrEqual(0);
        expect(row).toBeLessThan(fieldSize);
        expect(col).toBeGreaterThanOrEqual(0);
        expect(col).toBeLessThan(fieldSize);
      });
    });
  });
});