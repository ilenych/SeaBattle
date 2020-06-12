"use strict";
import { status } from "./Enum.js";
import { field } from "./Enum.js";
export class Basic {
  /**
   * Return link on cell with given coord
   * @param {Object} coords - {x: Int, y: Int}
   */
  getCell(coords, field) {
    let cell;
    if (Array.isArray(coords)) {
      cell = field.cells.filter((item) => {
        return item.x == coords[0] && item.y == coords[1];
      });
    } else {
      cell = field.cells.filter((item) => {
        return item.x == coords.x && item.y == coords.y;
      });
    }

    if (cell.length != 0) {
      return cell[0];
    } else {
      return false;
    }
  }

  /**
   * Return random coordinates cell on fields based on position
   * @param {Number} ship - ship length
   * @param {*} position - vertical(0), horizontal(1)
   */
  randomCell(ship, position) {
    const start = 10 - ship; // Set start coord based on ship
    const end = 9 - start; // Set end cood based on coord start
    switch (position) {
      case 0:
        return {
          x: this.randomInteger(start, end),
          y: this.randomInteger(0, 10),
        };
      case 1:
        return {
          x: this.randomInteger(0, 10),
          y: this.randomInteger(start, end),
        };
      default:
        return { x: this.randomInteger(0, 10), y: this.randomInteger(0, 10) };
    }
  }
  /**
   * Return random number from min to max
   * @param {Number} min
   * @param {Number} max
   */
  randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }

  shotToCell(pressedCell, fieldId, coords, fieldObject) {
    // If past
    if (
      pressedCell.status === status.empty ||
      pressedCell.status === status.block
    ) {
      document
        .getElementById(`f${fieldId}x${coords[0]}y${coords[1]}`)
        .classList.add("miss");
      return true;
    }

    // If ship
    if (pressedCell.status === status.ship) {
      document
        .getElementById(`f${fieldId}x${coords[0]}y${coords[1]}`)
        .classList.add("hit");

      // Check ship on sank
      let isShipSank = true;

      for (let ship of pressedCell.shipParts) {
        const cell = this.getCell(ship, fieldObject);
        if (!cell.shot) {
          isShipSank = false;
          break;
        }
      }

      if (isShipSank) {
        for (let ship of pressedCell.shipParts) {
          document
            .getElementById(`f${fieldId}x${ship.x}y${ship.y}`)
            .classList.add("sank");
        }
      }

      // Check whether all ships are damaged
      let endOfGame = true;

      for (let ship of fieldObject.cells) {
        if (ship.status === status.ship) {
          if (!ship.shot) {
            endOfGame = false;
            break;
          }
        }
      }
      // Check end game
      if (endOfGame) {
        fieldId == 2 ? alert('Поздравляю, вы выйграли') : alert('Вы проиграли');
      }
      return false;
    }
  }
}
