"use strict";
//Enum
const status = {
    ship: 'ship',
    empty: 'empty',
    block: 'block',
}

export class Field {
  constructor() {
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
        this.field.cells.push({ x: i, y: j, status: status.empty });
      }
    }
	// Set position ship
    for (let ship of this.field.shipsLength) {
      this.positionShip(ship);
    }
    return this.field;
  }

/**
 * Return link on cell with given coord
 * @param {Object} coords - {x: Int, y: Int}
 */
  getCell(coords) {
    let cell = this.field.cells.filter((item) => {
      return item.x == coords.x && item.y == coords.y;
    });
    return cell[0];
  }
/**
 * Return random coordinates cell on fields based on position
 * @param {Number} ship - ship length 
 * @param {*} position - vertical(0), horizontal(1)
 */
  randomCell(ship, position) {
    const start = 10 - ship; // Set start coord based on ship
    const end = 9 - start; // Set end cood based on coord start
    if (position == 0) {
      return {
        x: this.randomInteger(start, end),
        y: this.randomInteger(0, 10),
      };
    } else {
      return {
        x: this.randomInteger(0, 10),
        y: this.randomInteger(start, end),
      };
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

  /**
   * Set ship basen on position
   * position == 1 (vertical), position == 0 (horiztal)
   * @param {Number} ship - ship length  
   */
  positionShip(ship) {
    const position = Math.round(Math.random());
    const randomCell = this.randomCell(ship, position);

    const cell = this.getCell(randomCell);
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
		const cell = this.getCell(coord);
		if (cell != undefined && cell.status != status.ship) {
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
    let cell = this.getCell(coord);
    cell.status = status.ship;
  }

  /**
   * Try set ship on field
   * @param {Number} ship - ship length
   * @param {Object} coords - {x: Int, y: Int}
   */
  tryShipOnField(ship, coords) {
	  let flag = [];
	  for(let coord of coords) {
		  let cell = this.getCell(coord)
		  if(cell.status != status.block && cell.status != status.ship){
			flag.push(true)
		  } else{
			flag.push(false)
		  }
	  }
	  flag.includes(false) ? this.positionShip(ship) : this.placeShipOnFiled(coords)
    // console.log(this.field)
  }

/**
 * Set status on cells
 * @param {Obbject} coords - {x: Int, y: Int}
 */
  placeShipOnFiled(coords) {

    for (let coord of coords) {
	this.setBlockStatus(coord)
	this.setShipStatus(coord);
    }
  }
}
