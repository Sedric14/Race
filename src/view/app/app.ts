/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
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
  private static bodyContainer: HTMLElement = document.body;

  private static defaultPageId = "current-page";

  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === "garage") {
      page = new GaragePage(idPage);
    } else if (idPage === "winners") {
      page = new WinnersPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.bodyContainer.append(pageHTML);
    }
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
    App.bodyContainer.append(this.header.render());
    App.renderNewPage("garage");
    App.enableRouteChange();
  }
}

export default App;
