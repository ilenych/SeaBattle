"use strict";
import { Basic } from './Basic.js';

export class PlayerShot extends Basic {
    constructor (id, field) {
        super();
        this.id = id;
        this.field = field;
    }

    shot() {
        // Look for cell with coord - return, example [x5, y5]
        let coords = this.id.match(/x\d{1,}|y\d{1,}/g);
        // Create coord [Int, int]
        coords = coords.map(item => +item.slice(1)); 
        let fieldId = +this.id.match(/f\d/g)[0].slice(1);
        let pressedCell = super.getCell(coords, this.field);

        // Check cell on click
        if (pressedCell.shot) {
            return false;
        }
        pressedCell.shot = true;

        return super.shotToCell(pressedCell, fieldId, coords)
    }
}