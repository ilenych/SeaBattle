import { Field } from "./Field.js";

//Add listener on main div
const main = document.getElementById("main");
main.addEventListener("click", createField);

//Add listener on first and second fields
const firstField = document.getElementById("firstField");
const secondField = document.getElementById("secondField");

function createField() {
  let mf = new Field();
  const myField = mf.generateField();
  let ef = new Field();
  const enemyField = ef.generateField();

  console.log("Create fields");

  for (let field of [
    [myField, firstField],
    [enemyField, secondField],
  ]) {
    for (let i = 0; i < field[0].fieldSize.x; i++) {
      let row = document.createElement("div");
      row.classList.add("field-row");
      field[1].appendChild(row);
      for (let j = 0; j < field[0].fieldSize.y; j++) {
        let cell = document.createElement("div");
        cell.classList.add("field-cell");
        row.appendChild(cell);
      }
    }
  }

  main.removeEventListener("click", createField);
}
