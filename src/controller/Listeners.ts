import Crud from "../model/CrudServices";
import { car } from "../model/Interfaces";
import Services from "../model/Services";
import App from "../view/app/app";
import GaragePage from "../view/garageRender";

class Listeners {

  static updatingCar: car;

  public static create(): void {
    const btnTopCont = document.querySelector(".btnTopCont");
    btnTopCont?.addEventListener("click", () => {
      Services.create();
      Services.updateGaragePage()
    });

    const btnMiddleCont = document.querySelector(".btnMiddleCont");
    btnMiddleCont?.addEventListener("click", () => {
      Crud.updateCar();
      Services.updateGaragePage()
    });

    const genCars = document.querySelector(".genCarsBtn");
    genCars?.addEventListener("click", () => {
      Services.generateCars()
      Services.updateGaragePage()
    });

    const prew = document.querySelector(".prew");
    prew?.addEventListener("click", () => {
      if (GaragePage.page > 0) GaragePage.page -= 1;
      const pageNum = document.querySelector(".pageNum") as HTMLElement
      pageNum.textContent = `page #${GaragePage.page + 1}`;
      Services.updateGaragePage()
    });

    const next = document.querySelector(".next");
    next?.addEventListener("click", () => {
      let allCar = Crud.getAllCar();
      allCar.then((el) => {
        if (Math.ceil(el.length / 7) > (GaragePage.page + 1)) GaragePage.page += 1;
        const pageNum = document.querySelector(".pageNum") as HTMLElement
        pageNum.textContent = `page #${GaragePage.page + 1}`;
      })
      Services.updateGaragePage()
    });

    const raceBtn = document.querySelector(".raceBtn");
    raceBtn?.addEventListener("click", () => {
      console.log(Services.isRace);
      
      if(Services.isRace === false && Services.countRace === 0){ Services.startRace()}
    });

    const resetBtn = document.querySelector(".resetBtn");
    resetBtn?.addEventListener("click", () => {
      Services.countRace = 0;
      Services.updateGaragePage
    })
  }
}

export default Listeners;