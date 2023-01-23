/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import Listeners from "../controller/Listeners";
import App from "../view/app";
import GaragePage from "../view/garageRender";
import MessageRender from "../view/MessageRender";
import Crud from "./CrudServices";
import { body, car, winner } from "./Interfaces";

class Services {
  static namesArray = ["Tesla", "BMW", "Mercedes", "Ford", "Opel", "Volkswagen", "Telega",
    "Audi", "Skoda", "Yaguar", "Lamborghini", "Rolls-Royce", "Nissan", "Hyundai", "Mazda",
    "Mitsubishi", "Honda", "Toyota"];

    static secondArray = ["Model Y", "X7", "W233", "Mustang", "Insignia", "Passat", "RS7", 
    "Fabia", "X-Type", "Huracan", "Phantom", "Patrol", "Elantra", "Miata", "Lancer", "Accord", "Prius"]

  static garagePage = new GaragePage("garage");

  static isRace = false;

  static isWin  = false;

  static countRace = 7;

  static updateGaragePage() {
    const app = new App();
    app.run()
  }

  static create() {
    const inputName = document.querySelector(".inputTopCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorTopCont") as HTMLInputElement;
    const name = inputName.value;
    const color = inputColor.value;
    const newCar: car = {
      id: null,
      name: `${name}`,
      color: `${color}`,
    };
    Crud.createCar(newCar);
  }

  static createWin(wId: number, wTime: number) {
    const win: winner = {
      id: wId,
      time: wTime,
      wins: 1
    };
    Crud.getWin(wId).then((i) => {
      if (i.id !== undefined) {
        const Body: body = {
          time: wTime,
          wins: (i.wins + 1)
        }
        if (i.time < wTime) Body.time = i.time;
        Crud.updateWin(wId, Body)
      } else {
        Crud.createWinner(win);
      }
    })
  }

  static update(uCar: car) {
    const inputName = document.querySelector(".inputMiddleCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorMiddleCont") as HTMLInputElement;
    inputName.value = uCar.name;
    inputColor.value = uCar.color;
    Listeners.updatingCar = uCar;
  }

  static generateColor() {
    let red = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if (red.length === 1) red = `0${red}`;
    let green = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if (green.length === 1) green = `0${green}`;
    let blue = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if (blue.length === 1) blue = `0${blue}`;
    return `#${red}${green}${blue}`;
  }

  static generateCars() {
    for (let i = 0; i < 100; i += 1) {
      const first = this.namesArray[Math.floor(Math.random() * this.namesArray.length)];
      const second = this.secondArray[Math.floor(Math.random() * this.secondArray.length)];
      const name = `${first} ${second}`;
      const color = this.generateColor();
      const newCar: car = {
        id: null,
        name: `${name}`,
        color: `${color}`,
      };
      Crud.createCar(newCar);
    }
    this.garagePage.render();
  }

  static runAnim(id: number, status: string, btn: string) {
    if(Services.isRace && btn === "B") return;
    const btnB = document.getElementById(`btnB${id}`);
    const btnA = document.getElementById(`btnA${id}`);
    if(btn === "A" && btnA?.classList.contains("disactiveBtn")) return;
    if(btn === "B" && btnB?.classList.contains("disactiveBtn")) return;
    if (status === "stopped" && !btnB?.classList.contains("disactiveBtn")) {
      btnB?.classList.add("disactiveBtn");
      btnA?.classList.remove("disactiveBtn");
    }
    if (status === "started" && !btnA?.classList.contains("disactiveBtn")) {
      btnA?.classList.add("disactiveBtn");
      btnB?.classList.remove("disactiveBtn");
    }
    const engine = Crud.runStop(id, status);
    engine.then((i) => {
      Services.anim(i.velocity, i.distance, id)
    })
  }

  static anim(vel: number, dist: number, id: number) {
    const driveStatus = Crud.driveStatus(id, "drive");
    const animCar = document.getElementById(`car${id}`) as HTMLElement;
    if (vel === 0) animCar.style.left = "3000px";
    const width = window.innerWidth;
    const speed = width / dist * 7 * vel;
    let pos = 0;
    let st = 0;
    const startTime = Date.now();
    function animation() {
      console.log(Services.isRace, Services.countRace);
      if (pos < (width - 265) && st !== 500 && st!== 404 && animCar.style.left !== "3000px") {
         window.requestAnimationFrame(animation);
      }
      if (st === 500 && Services.isRace ===  true) Services.countRace += 1;
      if (pos > (width - 265) ) {
          if (Services.isRace ===  true) Services.countRace += 1;
          if (Services.countRace === 7) Services.isRace = false;
        const time = (Math.floor((Date.now() - startTime) / 10)) / 100;
        if (Services.isRace ===  true && Services.isWin === false) {
          Services.showWinMessage(id, time);
          Services.isWin = true;
        } 
      }
      animCar.style.left = `${pos += speed}px`;
    }
    const animId = requestAnimationFrame(animation);
    driveStatus.then((k) => {
      if(k === 404) cancelAnimationFrame(animId);
      st = k })
  }

  static showWinMessage(id: number, time: number) {
    const Car = Crud.getCar(id);
    let name: string;
    Car.then((i) => {
      name = i.name
      const garPage = document.querySelector("#garage");
      garPage?.append(MessageRender.winnerMessage(name, time));
      Services.createWin(id, time);
    })
  }

  static startRace(stat: string) {
    if(stat !== "stopped") Services.isRace = true;
    const arrayCars = Crud.getAllCar();
    arrayCars.then((arr) => {
      arr.forEach((i, ind) => {
        const page = Number(sessionStorage.getItem(App.sessions.garPage));
        if (ind >= (page * 7) && ind < ((page + 1) * 7)) {
          if(i.id) Services.runAnim(i.id, stat, "none");
        }
      })
    })
  }
}

export default Services;