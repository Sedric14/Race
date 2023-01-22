/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import Listeners from "../controller/Listeners";
import ErrorPage, { ErrorTypes } from "./errorRender";
import GaragePage from "./garageRender";
import WinnersPage from "./winnerRender";
import Header from "./header";

class App {
  static bodyContainer: HTMLElement = document.body;

  static defaultPageId = "current-page";

  static sessions = {
    garPage: "page",
    winPage: "wPage",
    pagWin: "sortWins",
    pagTime: "sortTime"
  };

  static sorted = { none: "none", up: "up", down: "down" };

  header: Header;

  static renderNewPage(idPage: string) {
    const gPage = document.getElementById("garage");
    const wPage = document.getElementById("winners");
    const errPage = document.getElementById("error");

    if (idPage === "garage" || idPage === "") {
      if (gPage) gPage.style.display = "block";
      if (wPage) wPage.style.display = "none";
      if (errPage) errPage.style.display = "none";
    } else if (idPage === "winners") {
      if (gPage) gPage.style.display = "none";
      if (wPage) wPage.style.display = "block";
      if (errPage) errPage.style.display = "none";
    } else {
      if (gPage) gPage.style.display = "none";
      if (wPage) wPage.style.display = "none";
      if (errPage) errPage.style.display = "block";
    }
    Listeners.create();
  }

  static enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header("header", "headerButton");
  }

  run() {
    if (!sessionStorage.getItem(App.sessions.garPage)) {
      sessionStorage.setItem(App.sessions.garPage, JSON.stringify(0));
    }
    if (!sessionStorage.getItem(App.sessions.winPage)) {
      sessionStorage.setItem(App.sessions.winPage, JSON.stringify(0));
    }
    if (!sessionStorage.getItem(App.sessions.pagWin)) {
      sessionStorage.setItem(App.sessions.pagWin, App.sorted.none);
    }
    if (!sessionStorage.getItem(App.sessions.pagTime)) {
      sessionStorage.setItem(App.sessions.pagTime, App.sorted.none);
    }
    App.bodyContainer.replaceChildren();
    App.bodyContainer.append(this.header.render());
    const garagePage = new GaragePage("garage");
    const winnerPage = new WinnersPage("winners");
    const errorPage = new ErrorPage("", ErrorTypes.Error_404);
    const errPage = errorPage.render();
    errPage.id = "error";
    errPage.style.display = "none";
    const gPage = garagePage.render();
    gPage.id = "garage";
    const wPage = winnerPage.render();
    wPage.id = "winners";
    wPage.style.display = "none";
    App.bodyContainer.append(gPage, wPage, errPage);
    const hash = window.location.hash.slice(1);
    App.renderNewPage(hash);
    App.enableRouteChange();
  }
}

export default App;
