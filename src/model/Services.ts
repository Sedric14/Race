import App from "../view/app/app";
import GaragePage from "../view/garageRender";
import Crud from "./CrudServices";
import { car } from "./Interfaces";

class Services {
  static namesArray = ["Tesla", "BMW", "Mersedes", "Ford", "Opel", "Wolkswagen", "Telega",
    "Audi", "Shkoda", "Yaguar", "Lambordgini", "RollsRoys", "Nissan", "Hyndai", "Masda",
    "Mitsubishi", "Honda", "Toyota"];

  static garagePage = new GaragePage("garage");

  public static async create() {
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

  public static async update(id: number) {
    const inputName = document.querySelector(".inputMiddleCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorMiddleCont") as HTMLInputElement;
    const name = inputName.value;
    const color = inputColor.value;
    const car: car = {
      id: id,
      name: `${name}`,
      color: `${color}`,
    };
    Crud.updateCar(car);
  }

  static generateColor() {
    let red = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if(red.length === 1) red = `0${red}`;
    let green = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if(green.length === 1) green = `0${green}`;
    let blue = `${(Math.floor(Math.random() * 256).toString(16))}`;
    if(blue.length === 1) blue = `0${blue}`;
    return `#${red}${green}${blue}`;
  }

  public static async generateCars() {
    for (let i = 0; i < 10; i++) {
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
}

export default Services;