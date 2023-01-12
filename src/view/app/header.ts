/* eslint-disable no-useless-constructor */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// import Component from "../app/components";
// import { PageIds } from "../app/app";

const Buttons = [
  {
    id: "garage",
    text: "GARAGE",
  },
  {
    id: "winners",
    text: "WINNERS",
  },
];

class Header {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  renderPageButtons() {
    const pageButtons = document.createElement("div");
    pageButtons.className = "headerBtnContainer"
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement("a");
      buttonHTML.className = "headerBtn btnOne";
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
