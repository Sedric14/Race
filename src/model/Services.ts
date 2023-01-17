import Listeners from "../controller/Listeners";
import App from "../view/app/app";
import GaragePage from "../view/garageRender";
import Crud from "./CrudServices";
import { car, engine } from "./Interfaces";

class Services {
  static namesArray = ["Tesla", "BMW", "Mersedes", "Ford", "Opel", "Wolkswagen", "Telega",
    "Audi", "Shkoda", "Yaguar", "Lambordgini", "RollsRoys", "Nissan", "Hyndai", "Masda",
    "Mitsubishi", "Honda", "Toyota"];

  static garagePage = new GaragePage("garage");

  public static updateGaragePage(){
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
      const name = this.namesArray[Math.floor(Math.random() * this.namesArray.length)];
      const color = this.generateColor();
      const car: car = {
        id: null,
        name: `${name}`,
        color: `${color}`,
      };
      Crud.createCar(car);
    }
    this.garagePage.render();
    App.renderNewPage("garage")
  }

  public static runAnim(id: number, status: string) {
    const btnB =document.getElementById(`btnB${id}`);
    const btnA =document.getElementById(`btnA${id}`);
    if(status === "stopped" && !btnB?.classList.contains("disactiveBtn")){
      btnB?.classList.add("disactiveBtn");
      btnA?.classList.remove("disactiveBtn");
    }
    if(status === "started" && !btnA?.classList.contains("disactiveBtn")){
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
    }
    requestAnimationFrame(animation);
    driveStatus.then((k) => { st = k })
  }

  public static startRace(){
    const arrayCars = Crud.getAllCar();
    arrayCars.then((arr) => {
      arr.forEach((i, ind) => {
        if(ind >= (GaragePage.page * 7) && ind < ((GaragePage.page + 1) * 7)){
          Services.runAnim(i.id as number, "started");
        }
      })
    })
  }
}

export default Services;