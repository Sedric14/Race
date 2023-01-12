/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Page from "./app/page";

class GaragePage extends Page {
  // constructor(id: string) {
  //   super(id);
  // }

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.textContent = text;
    return headerTitle;
  }

  render() {
    const title = GaragePage.createHeaderTitle("GARAGE");
    this.container.append(title);
    return this.container;
  }
}

export default GaragePage;
