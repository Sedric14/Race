/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import Crud from "../model/CrudServices";
import { car } from "../model/Interfaces";
import Services from "../model/Services";
import App from "../view/app";
import GaragePage from "../view/garageRender";
import MessageRender from "../view/MessageRender";
import WinnersPage from "../view/winnerRender";

class Listeners {
  static updatingCar: car;

  static create(): void {
    Listeners.make();
    Listeners.update();
    Listeners.generate();
    Listeners.race();
    Listeners.reset();
    Listeners.nextPrew();
    Listeners.pagination(
      App.sessions.pagWin,
      App.sessions.pagTime,
      ".winListHeaderCount"
    );
    Listeners.pagination(
      App.sessions.pagTime,
      App.sessions.pagWin,
      ".winListHeaderTime"
    );
  }

  static make() {
    const btnTopCont = document.querySelector(".btnTopCont");
    btnTopCont?.addEventListener("click", () => {
      Services.create();
      Services.updateGaragePage();
    });
  }

  static update() {
    const btnMiddleCont = document.querySelector(".btnMiddleCont");
    btnMiddleCont?.addEventListener("click", () => {
      Crud.updateCar();
      Services.updateGaragePage();
    });
  }

  static generate() {
    const genCars = document.querySelector(".genCarsBtn");
    genCars?.addEventListener("click", () => {
      Services.generateCars();
      Services.updateGaragePage();
    });
  }

  static race() {
    const raceBtn = document.querySelector(".raceBtn");
    raceBtn?.addEventListener("click", () => {
      const messWin = document.querySelector(".messCont");
      if (messWin) messWin.parentNode?.removeChild(messWin);
      let num = 0;
      if (GaragePage.count !== 0 && GaragePage.count < 7) {
        num = GaragePage.count;
      } else {
        num = 7;
      }
      if (Services.isRace === false && Services.countRace === num) {
        Services.updateGaragePage();
        Services.countRace = 0;
        Services.isWin = false;
        Services.startRace("started");
      } else {
        Listeners.showMessage();
      }
    });
  }

  static showMessage() {
    MessageRender.maintenance();
    const btnOk = document.querySelector(".btnOk");
    btnOk?.addEventListener("click", () => {
      const field = document.querySelector(".field");
      field?.parentNode?.removeChild(field);
      // Services.isRace = false;
      Services.isWin = false;
    });
  }

  static reset() {
    const resetBtn = document.querySelector(".resetBtn");
    resetBtn?.addEventListener("click", () => {
      if (Services.isRace === false) {
        Services.updateGaragePage();
        Services.startRace("stopped");
      } else {
        Listeners.showMessage();
      }
    });
  }

  static prew(sess: string, cName: string) {
    if (Number(sessionStorage.getItem(sess)) > 0) {
      console.log("prew 1", sessionStorage.getItem(sess));
      sessionStorage.setItem(
        sess,
        JSON.stringify(Number(sessionStorage.getItem(sess)) - 1)
      );
      console.log("prew 2", sessionStorage.getItem(sess));
    }
    const pageNum = document.querySelector(cName);
    if (pageNum)
      pageNum.textContent = `page #${Number(sessionStorage.getItem(sess)) + 1}`;
    Services.updateGaragePage();
  }

  static next(sess: string, cName: string, num: number) {
    let all;
    if (num === 10) {
      all = Crud.getAllWinners();
    } else {
      all = Crud.getAllCar();
    }
    all.then((el) => {
      if (
        Math.ceil(el.length / num) >
        Number(sessionStorage.getItem(sess)) + 1
      ) {
        console.log("next 1", sessionStorage.getItem(sess));
        sessionStorage.setItem(
          sess,
          JSON.stringify(Number(sessionStorage.getItem(sess)) + 1)
        );
        console.log("next 2", sessionStorage.getItem(sess));
      }
      const pageNum = document.querySelector(cName);
      if (pageNum)
        pageNum.textContent = `page #${
          Number(sessionStorage.getItem(sess)) + 1
        }`;
    });
    Services.updateGaragePage();
  }

  static nextPrew() {
    const prew = document.querySelector(".prew");
    prew?.addEventListener("click", () => {
      Listeners.prew(App.sessions.garPage, ".pageNum");
    });

    const next = document.querySelector(".next");
    next?.addEventListener("click", () => {
      Listeners.next(App.sessions.garPage, ".pageNum", 7);
    });

    const winPrew = document.querySelector(".winPrew");
    winPrew?.addEventListener("click", () => {
      Listeners.prew(App.sessions.winPage, ".winPageNum");
    });

    const winNext = document.querySelector(".winNext");
    winNext?.addEventListener("click", () => {
      Listeners.next(App.sessions.winPage, ".winPageNum", 10);
    });
  }

  static pagination(sess: string, sess2: string, cName: string) {
    const winListHeaderTime = document.querySelector(cName);
    winListHeaderTime?.addEventListener("click", () => {
      sessionStorage.setItem(sess2, App.sorted.none);
      if (sessionStorage.getItem(sess) === App.sorted.none) {
        sessionStorage.setItem(sess, App.sorted.up);
        WinnersPage.winsSort = sessionStorage.getItem(sess);
      } else if (sessionStorage.getItem(sess) === App.sorted.up) {
        sessionStorage.setItem(sess, App.sorted.down);
      } else if (sessionStorage.getItem(sess) === App.sorted.down) {
        sessionStorage.setItem(sess, App.sorted.none);
      }
      Services.updateGaragePage();
    });
  }
}

export default Listeners;
