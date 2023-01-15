import Crud from "../model/CrudServices";
import Services from "../model/Services";
import App from "../view/app/app";
import GaragePage from "../view/garageRender";

class Listeners {
  public static create(): void {

    const btnTopCont = document.querySelector(".btnTopCont");
    btnTopCont?.addEventListener("click", () => {
      Services.create()
    });

    const btnMiddleCont = document.querySelector(".btnMiddleCont");
    btnMiddleCont?.addEventListener("click", () => {
      Services.update(5)
    });

    const genCars = document.querySelector(".genCarsBtn");
    genCars?.addEventListener("click", () => {
      Services.generateCars()
    });

    const prew = document.querySelector(".prew");
    prew?.addEventListener("click", () => {
      if (GaragePage.page > 0) GaragePage.page -= 1;
      const pageNum = document.querySelector(".pageNum") as HTMLElement
      pageNum.textContent = `page #${GaragePage.page + 1}`;
      App.renderNewPage("garage");
    });

    const next = document.querySelector(".next");
    next?.addEventListener("click", () => {
      let allCar = Crud.getAllCar();
      allCar.then((el) => {
        if (Math.ceil(el.length / 10) > (GaragePage.page + 1)) GaragePage.page += 1;
        const pageNum = document.querySelector(".pageNum") as HTMLElement
        pageNum.textContent = `page #${GaragePage.page + 1}`;
      })
      App.renderNewPage("garage");
    });
  }
}

export default Listeners;