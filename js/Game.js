"use strict";
import { PlayerShot } from "./PlayerShot.js";
import { BotShot } from "./BotShot.js";

export class Game extends PlayerShot {
  constructor(myFieldObject, myFieldId, enemyFieldObject, enemyFieldId) {
    super();

    this.myFieldObject = myFieldObject;
    this.myFieldId = myFieldId;
    this.enemyFieldObject = enemyFieldObject;
    this.enemyFieldId = enemyFieldId;
  }

  start() {
    const enemyField = document.getElementById(this.enemyFieldId);
    const status = document.getElementById("status");

    for (let elem of enemyField.getElementsByClassName("field-cell")) {
      elem.addEventListener("click", myShot);
    }

    let enemyFieldObject = this.enemyFieldObject;

    status.innerText = "Ваш ход...";

    function myShot(event) {
      let sp = new PlayerShot(event.target.id, enemyFieldObject);
      let answer = sp.shot();

      if (answer) {
        for (let elem of enemyField.getElementsByClassName("field-cell")) {
          elem.removeEventListener("click", myShot);
        }
        status.innerText = "Ход компьютера...";
        setTimeout(() => {
          enemyShot();
        }, 1000);
      }
    }

    let myFieldObject = this.myFieldObject;

    function enemyShot() {
      let answer;

      let bot = new BotShot(myFieldObject);
      answer = bot.shot();


      if (answer) {
        for (let elem of enemyField.getElementsByClassName("field-cell")) {
          elem.addEventListener("click", myShot);
        }
        status.innerText = "Ваш ход...";
      } else {
        setTimeout(() => {
          enemyShot(answer);
        }, 1000);
      }
    }
  }
}
