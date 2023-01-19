/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-cycle
import Listeners from "../../controller/Listeners";
import ErrorPage, { ErrorTypes } from "../errorRender";
import GaragePage from "../garageRender";
import WinnersPage from "../winnerRender";
import Header from "./header";

class App {
  static bodyContainer: HTMLElement = document.body;

  static defaultPageId = "current-page";

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
    if (!sessionStorage.getItem("page")) {
      sessionStorage.setItem("page", JSON.stringify(0));
    }
    if (!sessionStorage.getItem("wPage")) {
      sessionStorage.setItem("wPage", JSON.stringify(0));
    }
    if (!sessionStorage.getItem("sortWins")) {
      sessionStorage.setItem("sortWins", WinnersPage.winsSorted.none);
    }
    if (!sessionStorage.getItem("sortTime")) {
      sessionStorage.setItem("sortTime", WinnersPage.winsSorted.none);
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
