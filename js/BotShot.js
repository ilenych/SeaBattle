'use strict'

import { Basic } from './Basic.js';

export class BotShot extends Basic {
    constructor (fieldObject) {
        super();
        this.fieldId = 1
        this.fieldObject = fieldObject;
    }

    shot() {
        // Random coord cell
        let coords = super.randomCell(); 
        // Look for current cell
        let cellToShot = super.getCell(coords, this.fieldObject);

        // Check cell on click
        if (cellToShot.shot) {
            return this.shot();
        }
        cellToShot.shot = true
        // Create coord
        let coord = [coords.x, coords.y]
        return super.shotToCell(cellToShot, this.fieldId, coord, this.fieldObject)
    }
}