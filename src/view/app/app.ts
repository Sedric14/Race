/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Listeners from "../../controller/Listeners";
import Crud from "../../model/CrudServices";
import Services from "../../model/Services";
import ErrorPage, { ErrorTypes } from "../errorRender";
import GaragePage from "../garageRender";
import WinnersPage from "../winnerRender";
import Header from "./header";
import Page from "./page";

// export const PageIds = {
//   GaragePage: "garage",
//   WinnersPage: "winner",
// };

class App {
  public static bodyContainer: HTMLElement = document.body;

  private static defaultPageId = "current-page";

  private header: Header;
  

  static renderNewPage(idPage: string) {
    const gPage = document.getElementById("garage");
    const wPage = document.getElementById("winners");
    const errPage = document.getElementById("error");

    if (idPage === "garage") {
      if(gPage) gPage.style.display = "block";
      if(wPage) wPage.style.display = "none";
      if(errPage) errPage.style.display = "none";
    } else if (idPage === "winners") {
      if(gPage) gPage.style.display = "none";
      if(wPage) wPage.style.display = "block";
      if(errPage) errPage.style.display = "none";
    } else {
      if(gPage) gPage.style.display = "none";
      if(wPage) wPage.style.display = "none";
      if(errPage) errPage.style.display = "block";
    }
      Listeners.create();
  }

  private static enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.header = new Header("header", "headerButton");
  }

  run() {
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
    App.bodyContainer.append(gPage, wPage, errPage)
    App.renderNewPage("garage");
    App.enableRouteChange();
  }
}

export default App;
