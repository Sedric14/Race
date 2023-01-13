/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Listeners from "../controller/Listeners";
import Page from "./app/page";

class GaragePage extends Page {
  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.className = "titlePage";
    headerTitle.textContent = text;
    return headerTitle;
  }

  private static createChangeContainer() {
    const changeContainer = document.createElement("div");
    changeContainer.className = "changeContainer";
    const topCont = document.createElement("div");
    topCont.className = "topCont conts";
    const inputTopCont = document.createElement("input");
    inputTopCont.className = "inputTopCont inputChange";
    const colorTopCont = document.createElement("div");
    colorTopCont.className = "colorTopCont colorChange";
    const btnTopCont = document.createElement("div");
    btnTopCont.className = "btnTopCont btnChange btnOne";
    btnTopCont.textContent = "CREATE";
    topCont.append(inputTopCont, colorTopCont, btnTopCont);
    const middleCont = document.createElement("div");
    middleCont.className = "middleCont conts";
    const inputMiddleCont = document.createElement("input");
    inputMiddleCont.className = "inputMiddleCont inputChange";
    const colorMiddlrCont = document.createElement("div");
    colorMiddlrCont.className = "colorMiddlrCont colorChange";
    const btnMiddleCont = document.createElement("div");
    btnMiddleCont.className = "btnMiddleCont btnChange btnOne";
    btnMiddleCont.textContent = "UPDATE"
    middleCont.append(inputMiddleCont, colorMiddlrCont, btnMiddleCont);
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

  private static createCarBlock(){
    const carBlock = document.createElement("div");
    carBlock.className = "carBlock";
    const btnBlock = document.createElement("div");
    btnBlock.className = "btnBlock";
    const selectBtn = document.createElement("div");
    selectBtn.className = "selectBtn btnOne btn";
    selectBtn.textContent = "SELECT";
    const removeBtn = document.createElement("div");
    removeBtn.className = "removeBtn btnOne btn";
    removeBtn.textContent = "REMOVE";
    const nameCar = document.createElement("p");
    nameCar.className = "nameCar";
    nameCar.textContent = "Tesla";
    btnBlock.append(selectBtn, removeBtn, nameCar);
    const bottomBlock = document.createElement("div");
    bottomBlock.className = "bottomBlock";
    const btnA = document.createElement("div");
    btnA.className = "btnA letter";
    btnA.textContent = "A";
    const btnB = document.createElement("div");
    btnB.className = "btnB letter";
    btnB.textContent = "B"
    const car = document.createElement("div");
    car.className = "car";
    const flag = document.createElement("div");
    flag.className = "flag";
    bottomBlock.append(btnA, btnB, car, flag)
    carBlock.append(btnBlock, bottomBlock);
    return carBlock;
  }

  render() {
    const pageNum = document.createElement("p");
    pageNum.className = "pageNum";
    pageNum.textContent = "page";
    const title = GaragePage.createHeaderTitle("GARAGE");
    const changeContainer = GaragePage.createChangeContainer();
    const carBlock = GaragePage.createCarBlock();
    this.container.append(changeContainer, title, pageNum, carBlock);
    return this.container;
  }
}

export default GaragePage;
