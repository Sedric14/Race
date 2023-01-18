import Listeners from "../controller/Listeners";
import App from "../view/app/app";
import GaragePage from "../view/garageRender";
import MessageRender from "../view/MessageRender";
import Crud from "./CrudServices";
import { body, car, engine, winner } from "./Interfaces";

class Services {
  static namesArray = ["Tesla", "BMW", "Mercedes", "Ford", "Opel", "Volkswagen", "Telega",
    "Audi", "Skoda", "Yaguar", "Lamborghini", "Rolls-Royce", "Nissan", "Hyundai", "Mazda",
    "Mitsubishi", "Honda", "Toyota"];

    static secondArray = ["Model Y", "X7", "W233", "Mustang", "Insignia", "Passat", "RS7", 
    "Fabia", "X-Type", "Huracan", "Phantom", "Patrol", "Elantra", "Miata", "Lancer", "Accord", "Prius"]

  static garagePage = new GaragePage("garage");
  static isRace = false;
  static countRace = 0;

  public static updateGaragePage() {
    const app = new App();
    app.run()
  }

  public static create() {
    const inputName = document.querySelector(".inputTopCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorTopCont") as HTMLInputElement;
    const name = inputName.value;
    const color = inputColor.value;
    const car: car = {
      id: null,
      name: `${name}`,
      color: `${color}`,
    };
    Crud.createCar(car);
  }

  public static createWin(wId: number, wTime: number) {
    let win: winner = {
      id: wId,
      time: wTime,
      wins: 1
    };
    Crud.getWin(wId).then((i) => {
      if (i.id !== undefined) {
        const body: body = {
          time: wTime,
          wins: (i.wins + 1)
        }
        if (i.time < wTime) body.time = i.time;
        console.log(i.time, wTime, body.time);
        
        Crud.updateWin(wId, body)
      } else {
        Crud.createWinner(win);
      }
    })
  }

  public static update(car: car) {
    const inputName = document.querySelector(".inputMiddleCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorMiddleCont") as HTMLInputElement;
    inputName.value = car.name;
    inputColor.value = car.color;
    Listeners.updatingCar = car;
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

  public static generateCars() {
    for (let i = 0; i < 100; i++) {
      const first = this.namesArray[Math.floor(Math.random() * this.namesArray.length)];
      const second = this.secondArray[Math.floor(Math.random() * this.secondArray.length)];
      const name = `${first} ${second}`;
      const color = this.generateColor();
      const car: car = {
        id: null,
        name: `${name}`,
        color: `${color}`,
      };
      Crud.createCar(car);
    }
    this.garagePage.render();
  }

  public static runAnim(id: number, status: string, btn: string) {
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

  public static anim(vel: number, dist: number, id: number) {
    const driveStatus = Crud.driveStatus(id, "drive");
    const car = document.getElementById(`car${id}`) as HTMLElement;
    const width = window.innerWidth;
    const speed = width / dist * 7.5 * vel;
    let pos = 0;
    let st = 0;
    function animation() {
      car.style.left = `${pos += speed}px`;
      if (pos < (width - 240) && st !== 500) window.requestAnimationFrame(animation);
      if (pos > (width - 240) && Services.isRace === true) {
        Services.countRace === 6 ? Services.countRace = 0 : Services.countRace += 1;
        const time = (Math.floor((Date.now() - startTime) / 10)) / 100;
        Services.showWinMessage(id, time);
        Services.isRace = false;
      }
    }
    const startTime = Date.now();
    requestAnimationFrame(animation);
    driveStatus.then((k) => { st = k })
  }

  public static showWinMessage(id: number, time: number) {
    const car = Crud.getCar(id);
    let name: string;
    car.then((i) => {
      name = i.name
      App.bodyContainer.append(MessageRender.render(name, time));
      Services.createWin(id, time);
    })
  }

  public static startRace() {
    Services.isRace = true;
    const arrayCars = Crud.getAllCar();
    arrayCars.then((arr) => {
      arr.forEach((i, ind) => {
        if (ind >= (GaragePage.page * 7) && ind < ((GaragePage.page + 1) * 7)) {
          Services.runAnim(i.id as number, "started", "none");
        }
      })
    })
  }
}

export default Services;