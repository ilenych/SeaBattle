"use strict";
import { Basic } from "./Basic.js";
import { status } from "./Enum.js";

export class Field extends Basic {
  constructor() {
    super();
    this.field;
  }
  /**
   * Generate Field
   */
  generateField() {
    this.field = {
      cells: [],
      fieldSize: {
        x: 10,
        y: 10,
      },
      shipsLength: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
    };

    // Generate empty field
    for (let i = 0; i < this.field.fieldSize.x; i++) {
      for (let j = 0; j < this.field.fieldSize.y; j++) {
        this.field.cells.push({
          x: i,
          y: j,
          status: status.empty,
          shot: false,
        });
      }
    }
    // Set position ship
    for (let ship of this.field.shipsLength) {
      this.positionShip(ship);
    }
    return this.field;
  }

  /**
   * Set ship basen on position
   * position == 1 (vertical), position == 0 (horiztal)
   * @param {Number} ship - ship length
   */
  positionShip(ship) {
    const position = Math.round(Math.random());
    const randomCell = super.randomCell(ship, position);

    const cell = super.getCell(randomCell, this.field);
    let coords = [];

    for (let i = 0; i < ship; i++) {
      if (position == 1) {
        const coord = { x: cell.x, y: cell.y + i };
        coords.push(coord);
      } else {
        const coord = { x: cell.x + i, y: cell.y };
        coords.push(coord);
      }
    }
    this.tryShipOnField(ship, coords);
  }

  /**
   * Set block status on cell
   * @param {Object} coord - {x: Int, y: Int}
   */
  setBlockStatus(coord) {
    const coordsX = [coord.x - 1, coord.x + 1, coord.x];
    const coordsY = [coord.y - 1, coord.y + 1, coord.y];
    for (let coordX of coordsX) {
      for (let coordY of coordsY) {
        const coord = { x: coordX, y: coordY };
        const cell = super.getCell(coord, this.field);
        if (cell != false && cell.status != status.ship) {
          cell.status = status.block;
        }
      }
    }
  }

  /**
 Set ship status on cell
 * @param {Object} coord - {x: Int, y: Int}
 */
  setShipStatus(coord) {
    let cell = super.getCell(coord, this.field);
    cell.status = status.ship;
  }

  /**
   * Try set ship on field
   * @param {Number} ship - ship length
   * @param {Object} coords - {x: Int, y: Int}
   */
  tryShipOnField(ship, coords) {
    let flag = [];
    for (let coord of coords) {
      let cell = super.getCell(coord, this.field);
      if (cell.status != status.block && cell.status != status.ship) {
        flag.push(true);
      } else {
        flag.push(false);
      }
    }
    flag.includes(false)
      ? this.positionShip(ship)
      : this.placeShipOnFiled(coords);
    // console.log(this.field)
  }

  /**
   * Set status on cells
   * @param {Obbject} coords - {x: Int, y: Int}
   */
  placeShipOnFiled(coords) {
    for (let coord of coords) {
      this.setBlockStatus(coord);
      this.setShipStatus(coord);
    }
  }
}
