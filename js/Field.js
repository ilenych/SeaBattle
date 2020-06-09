"use strict";

export class Field {
  constructor() {
    this.field;
  }

  generateField() {
    this.field = {
      cells: [],
      fieldSize: {
        x: 10,
        y: 10,
      },
    };

    // Generate empty field
    for (let i = 0; i < this.field.fieldSize.x; i++) {
      for (let j = 0; j < this.field.fieldSize.y; j++) {
        this.field.cells.push({ x: i, y: j });
      }
    }

    return this.field;
  }
}
