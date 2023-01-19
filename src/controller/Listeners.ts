/* eslint-disable import/no-cycle */
import Crud from "../model/CrudServices";
import { car } from "../model/Interfaces";
import Services from "../model/Services";
import GaragePage from "../view/garageRender";
import WinnersPage from "../view/winnerRender";

class Listeners {
  static updatingCar: car;

  static create(): void {
    const btnTopCont = document.querySelector(".btnTopCont");
    btnTopCont?.addEventListener("click", () => {
      Services.create();
      Services.updateGaragePage();
    });

    const btnMiddleCont = document.querySelector(".btnMiddleCont");
    btnMiddleCont?.addEventListener("click", () => {
      Crud.updateCar();
      Services.updateGaragePage();
    });

    const genCars = document.querySelector(".genCarsBtn");
    genCars?.addEventListener("click", () => {
      Services.generateCars();
      Services.updateGaragePage();
    });

    const prew = document.querySelector(".prew");
    prew?.addEventListener("click", () => {
      if (GaragePage.page > 0) {
        sessionStorage.setItem("page", JSON.stringify(GaragePage.page - 1));
        GaragePage.page = Number(sessionStorage.getItem("page"));
      }
      //  GaragePage.page -= 1;
      const pageNum = document.querySelector(".pageNum");
      if (pageNum) pageNum.textContent = `page #${GaragePage.page + 1}`;
      Services.updateGaragePage();
    });

    const next = document.querySelector(".next");
    next?.addEventListener("click", () => {
      const allCar = Crud.getAllCar();
      allCar.then((el) => {
        if (Math.ceil(el.length / 7) > GaragePage.page + 1) {
          sessionStorage.setItem("page", JSON.stringify(GaragePage.page + 1));
          GaragePage.page = Number(sessionStorage.getItem("page"));
        }
        // GaragePage.page += 1;
        const pageNum = document.querySelector(".pageNum");
        if (pageNum) pageNum.textContent = `page #${GaragePage.page + 1}`;
      });
      Services.updateGaragePage();
    });

    const winPrew = document.querySelector(".winPrew");
    winPrew?.addEventListener("click", () => {
      if (WinnersPage.page > 0) {
        sessionStorage.setItem("wPage", JSON.stringify(WinnersPage.page - 1));
        WinnersPage.page = Number(sessionStorage.getItem("wPage"));
      }
      const pageNum = document.querySelector(".winPageNum");
      if (pageNum) pageNum.textContent = `page #${GaragePage.page + 1}`;
      Services.updateGaragePage();
    });

    const winNext = document.querySelector(".winNext");
    winNext?.addEventListener("click", () => {
      const allWins = Crud.getAllWinners();
      allWins.then((el) => {
        if (Math.ceil(el.length / 10) > WinnersPage.page + 1) {
          sessionStorage.setItem("wPage", JSON.stringify(WinnersPage.page + 1));
          WinnersPage.page = Number(sessionStorage.getItem("wPage"));
        }
        const pageNum = document.querySelector(".winPageNum");
        if (pageNum) pageNum.textContent = `page #${WinnersPage.page + 1}`;
      });
      Services.updateGaragePage();
    });

    const raceBtn = document.querySelector(".raceBtn");
    raceBtn?.addEventListener("click", () => {
      if (Services.isRace === false && Services.countRace === 7) {
        Services.countRace = 0;
        Services.startRace();
      }
    });

    const resetBtn = document.querySelector(".resetBtn");
    resetBtn?.addEventListener("click", () => {
      Services.isRace = false;
      // Services.animIdArray.forEach((i) => {
      //   window.cancelAnimationFrame(i);
      // });
      // Services.animIdArray = [];
      Services.updateGaragePage();
    });

    const winListHeaderCount = document.querySelector(".winListHeaderCount");
    winListHeaderCount?.addEventListener("click", () => {
      sessionStorage.setItem("sortTime", WinnersPage.winsSorted.none);
      if (sessionStorage.getItem("sortWins") === WinnersPage.winsSorted.none) {
        sessionStorage.setItem("sortWins", WinnersPage.winsSorted.up);
        WinnersPage.winsSort = sessionStorage.getItem("sortWins");
      } else if (
        sessionStorage.getItem("sortWins") === WinnersPage.winsSorted.up
      ) {
        sessionStorage.setItem("sortWins", WinnersPage.winsSorted.down);
      } else if (
        sessionStorage.getItem("sortWins") === WinnersPage.winsSorted.down
      ) {
        sessionStorage.setItem("sortWins", WinnersPage.winsSorted.none);
      }
      Services.updateGaragePage();
    });

    const winListHeaderTime = document.querySelector(".winListHeaderTime");
    winListHeaderTime?.addEventListener("click", () => {
      sessionStorage.setItem("sortWins", WinnersPage.winsSorted.none);
      if (sessionStorage.getItem("sortTime") === WinnersPage.winsSorted.none) {
        sessionStorage.setItem("sortTime", WinnersPage.winsSorted.up);
        WinnersPage.winsSort = sessionStorage.getItem("sortTime");
      } else if (
        sessionStorage.getItem("sortTime") === WinnersPage.winsSorted.up
      ) {
        sessionStorage.setItem("sortTime", WinnersPage.winsSorted.down);
      } else if (
        sessionStorage.getItem("sortTime") === WinnersPage.winsSorted.down
      ) {
        sessionStorage.setItem("sortTime", WinnersPage.winsSorted.none);
      }
      Services.updateGaragePage();
    });
  }
}
export default Listeners;
