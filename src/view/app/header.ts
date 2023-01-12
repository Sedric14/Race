// /* eslint-disable no-useless-constructor */
// /* eslint-disable import/extensions */
// /* eslint-disable import/no-unresolved */
// import Component from "../app/components";
// // import { PageIds } from "../app/app";

// const Buttons = [
//   {
//     id: "garage",
//     text: "GARAGE",
//   },
//   {
//     id: "winners",
//     text: "WINNERS",
//   },
// ];

// class Header extends Component {
//   constructor(tagName: string, className: string) {
//     super(tagName, className);
//   }

//   renderPageButtons() {
//     const pageButtons = document.createElement("div");
//     Buttons.forEach((button) => {
//       const buttonHTML = document.createElement("a");
//       buttonHTML.href = `#${button.id}`;
//       buttonHTML.innerText = button.text;
//       pageButtons.append(buttonHTML);
//     });
//     this.container.append(pageButtons);
//   }

//   render() {
//     this.renderPageButtons();
//     return super.container;
//   }
// }

// export default Header;
