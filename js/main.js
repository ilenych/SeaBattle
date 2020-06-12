import { Field } from "./Field.js";
import { Game } from "./Game.js";
import { field } from "./Enum.js";
import { status } from "./Enum.js";

// Add listener on main div
const newGame = document.getElementById("newGame");
newGame.addEventListener("click", createField);

// Add listener on first and second fields
const firstField = document.getElementById(field.first);
const secondField = document.getElementById(field.second);

// Add listener on restart game
const recreate = document.getElementById("restart");
recreate.addEventListener("click", recreateField);
/**
 * Craete field
 */
function createField() {
  document.getElementById("newGame").style.display = "none";
  recreate.style.display = "block";
  // Create 2 fields
  let mf = new Field();
  const myField = mf.generateField();
  let ef = new Field();
  const enemyField = ef.generateField();

  for (let field of [
    [myField, firstField, 1],
    [enemyField, secondField, 2],
  ]) {
    for (let i = 0; i < field[0].fieldSize.x; i++) {
      let row = document.createElement("div");
      row.classList.add("field-row");
      field[1].appendChild(row);
      for (let j = 0; j < field[0].fieldSize.y; j++) {
        let cell = document.createElement("div");
        cell.classList.add("field-cell");
        cell.id = `f${field[2]}x${i}y${j}`;
        row.appendChild(cell);
      }
    }
    // For each cell set new class list
    if (field[0] === myField) {
      for (let cell of field[0].cells) {
        document
          .getElementById(`f${field[2]}x${cell.x}y${cell.y}`)
          .classList.add(`${cell.status}`);
      }
    } else {
      for (let cell of field[0].cells) {
        document
          .getElementById(`f${field[2]}x${cell.x}y${cell.y}`)
          .classList.add(`${status.empty}`);
      }
    }
  }
  // Remove click
  main.removeEventListener("click", createField);
  // Start game
  let game = new Game(myField, field.first, enemyField, field.second);
  game.start();
}

function recreateField() {
  firstField.innerHTML = "";
  secondField.innerHTML = "";
  createField();
}
