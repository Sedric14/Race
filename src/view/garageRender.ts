/* eslint-disable import/no-cycle */

import Crud from "../model/CrudServices";
import { car } from "../model/Interfaces";
import Page from "./app/page";
import Services from "../model/Services";
// import App from "./app/app";
// import { strSvg } from "../assets/svg/svg";

class GaragePage extends Page {
  static carImage =
    "https://raw.githubusercontent.com/Sedric14/assets/main/race/car.svg";

  static page = Number(sessionStorage.getItem("page"));

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.textContent = `${text}`;
    headerTitle.className = "titlePage garageTitle";
    return headerTitle;
  }

  static createChangeContainer() {
    const changeContainer = document.createElement("div");
    changeContainer.className = "changeContainer";
    const topCont = document.createElement("div");
    topCont.className = "topCont conts";
    const inputTopCont = document.createElement("input");
    inputTopCont.className = "inputTopCont inputChange";
    const colorTopCont = document.createElement("input");
    colorTopCont.type = "color";
    colorTopCont.className = "colorTopCont colorChange";
    const btnTopCont = document.createElement("div");
    btnTopCont.className = "btnTopCont btnChange btnOne";
    btnTopCont.textContent = "CREATE";
    topCont.append(inputTopCont, colorTopCont, btnTopCont);
    const middleCont = document.createElement("div");
    middleCont.className = "middleCont conts";
    const inputMiddleCont = document.createElement("input");
    inputMiddleCont.className = "inputMiddleCont inputChange";
    const colorMiddleCont = document.createElement("input");
    colorMiddleCont.type = "color";
    colorMiddleCont.className = "colorMiddleCont colorChange";
    const btnMiddleCont = document.createElement("div");
    btnMiddleCont.className = "btnMiddleCont btnChange btnOne";
    btnMiddleCont.textContent = "UPDATE";
    middleCont.append(inputMiddleCont, colorMiddleCont, btnMiddleCont);
    const bottomCont = document.createElement("div");
    bottomCont.className = "bottomCont conts";
    const raceBtn = document.createElement("div");
    raceBtn.className = "raceBtn btnOne";
    raceBtn.textContent = "RACE";
    const resetBtn = document.createElement("div");
    resetBtn.className = "resetBtn btnOne";
    resetBtn.textContent = "RESET";
    const genCarsBtn = document.createElement("div");
    genCarsBtn.className = "genCarsBtn btnOne";
    genCarsBtn.textContent = "GENERATE CARS";
    bottomCont.append(raceBtn, resetBtn, genCarsBtn);
    changeContainer.append(topCont, middleCont, bottomCont);
    return changeContainer;
  }

  static createCarBlock(i: car) {
    const carBlock = document.createElement("div");
    carBlock.className = "carBlock";
    const btnBlock = document.createElement("div");
    btnBlock.className = "btnBlock";
    const selectBtn = document.createElement("div");
    selectBtn.className = "selectBtn btnOne btn";
    selectBtn.textContent = "SELECT";
    selectBtn.addEventListener("click", () => {
      Services.update(i);
    });
    const removeBtn = document.createElement("div");
    removeBtn.className = "removeBtn btnOne btn";
    removeBtn.textContent = "REMOVE";
    removeBtn.addEventListener("click", () => {
      if (i.id) Crud.deleteCar(i.id);
    });
    const nameCar = document.createElement("p");
    nameCar.className = "nameCar";
    nameCar.textContent = i.name;
    btnBlock.append(selectBtn, removeBtn, nameCar);
    const bottomBlock = document.createElement("div");
    bottomBlock.className = "bottomBlock";
    const btnA = document.createElement("div");
    btnA.className = "btnA letter activeBtn";
    btnA.textContent = "A";
    btnA.id = `btnA${i.id}`;
    btnA.addEventListener("click", () => {
      if (i.id) Services.runAnim(i.id, "started", "A");
    });
    const btnB = document.createElement("div");
    btnB.className = "btnB letter disactiveBtn";
    btnB.textContent = "B";
    btnB.id = `btnB${i.id}`;
    btnB.addEventListener("click", () => {
      if (i.id) Services.runAnim(i.id, "stopped", "B");
    });
    const newCar = document.createElement("div");
    newCar.className = "car";
    newCar.id = `car${i.id}`;
    newCar.style.backgroundColor = `${i.color}`;
    newCar.style.webkitMaskImage = `url("https://raw.githubusercontent.com/Sedric14/assets/main/race/car${Math.floor(
      Math.random() * 6 + 1
    )}.png")`;
    const flag = document.createElement("div");
    flag.className = "flag";
    bottomBlock.append(btnA, btnB, newCar, flag);
    carBlock.append(btnBlock, bottomBlock);
    return carBlock;
  }

  static createPrewNext() {
    const prewNextBlock = document.createElement("div");
    prewNextBlock.className = "prewNextBlock";
    const prew = document.createElement("div");
    const next = document.createElement("div");
    prew.className = "prew prewNext btnOne";
    next.className = "next prewNext btnOne";
    prew.textContent = "<<<";
    next.textContent = ">>>";
    prewNextBlock.append(prew, next);
    return prewNextBlock;
  }

  static createCarsList() {
    const carBlockContainer = document.createElement("div");
    carBlockContainer.className = "carBlockContainer";
    const allCar = Crud.getAllCar();
    allCar.then((el) => {
      const carCount = el.length;
      const title = document.querySelector(".garageTitle");
      if (title) title.textContent = `GARAGE (${carCount})`;
      el.forEach((i, ind) => {
        if (ind >= GaragePage.page * 7 && ind < (GaragePage.page + 1) * 7) {
          carBlockContainer.append(GaragePage.createCarBlock(i));
        }
      });
    });
    return carBlockContainer;
  }

  static createPageNum() {
    const pageNum = document.createElement("p");
    pageNum.className = "pageNum";
    pageNum.textContent = `page #${GaragePage.page + 1}`;
    return pageNum;
  }

  render() {
    const carBlockContainer = GaragePage.createCarsList();
    const pageNum = GaragePage.createPageNum();
    const title = GaragePage.createHeaderTitle(`GARAGE`);
    const changeContainer = GaragePage.createChangeContainer();
    const prewNext = GaragePage.createPrewNext();
    this.container.append(
      changeContainer,
      title,
      pageNum,
      carBlockContainer,
      prewNext
    );
    return this.container;
  }
}

export default GaragePage;
