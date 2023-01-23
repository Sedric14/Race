/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import Crud from "../model/CrudServices";
import { winner } from "../model/Interfaces";
import App from "./app";
import Page from "./page";

class WinnersPage extends Page {
  static winsSort = sessionStorage.getItem("sortWins");

  static timeSort = sessionStorage.getItem("sortTime");

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.className = "titlePage winnersTitle";
    headerTitle.textContent = text;
    return headerTitle;
  }

  static createWinnerBlock(Winner: winner, ind: number) {
    const winnerBlock = document.createElement("div");
    winnerBlock.className = "winnerBlock";
    const winNum = document.createElement("p");
    winNum.className = "winNum";
    winNum.textContent = `${ind + 1}`;
    const winImage = document.createElement("div");
    winImage.className = "winImage";
    const winName = document.createElement("p");
    winName.className = "winName";
    const winCount = document.createElement("p");
    winCount.className = "winCount";
    winCount.textContent = `${Winner.wins}`;
    const winTime = document.createElement("p");
    winTime.className = "winTime";
    winTime.textContent = `${Winner.time}`;
    const winnerCar = Crud.getCar(Winner.id);
    winnerCar.then((el) => {
      winImage.style.backgroundColor = `${el.color}`;
      winName.textContent = `${el.name}`;
    });
    winnerBlock.append(winNum, winImage, winName, winCount, winTime);
    return winnerBlock;
  }

  static createListHeader() {
    const winListHeader = document.createElement("div");
    winListHeader.className = "winListHeader";
    const winListHeaderNum = document.createElement("div");
    winListHeaderNum.className = "winListHeaderNum btnOne";
    winListHeaderNum.textContent = "№";
    const winListHeaderImage = document.createElement("div");
    winListHeaderImage.className = "winListHeaderImage btnOne";
    winListHeaderImage.textContent = "CAR";
    const winListHeaderName = document.createElement("div");
    winListHeaderName.className = "winListHeaderName btnOne";
    winListHeaderName.textContent = "NAME";
    const winListHeaderCount = document.createElement("div");
    winListHeaderCount.className = "winListHeaderCount btnOne";
    winListHeaderCount.textContent = "WINS";
    const winListHeaderTime = document.createElement("div");
    winListHeaderTime.className = "winListHeaderTime btnOne";
    winListHeaderTime.textContent = "BEST TIME";
    winListHeader.append(
      winListHeaderNum,
      winListHeaderImage,
      winListHeaderName,
      winListHeaderCount,
      winListHeaderTime
    );
    return winListHeader;
  }

  static createPrewNext() {
    const prewNextBlock = document.createElement("div");
    prewNextBlock.className = "winPrewNextBlock";
    const prew = document.createElement("div");
    const next = document.createElement("div");
    prew.className = "winPrew prewNext btnOne";
    next.className = "winNext prewNext btnOne";
    prew.textContent = "<<<";
    next.textContent = ">>>";
    prewNextBlock.append(prew, next);
    return prewNextBlock;
  }

  render() {
    const winListContainer = document.createElement("div");
    winListContainer.className = "winListContainer";
    winListContainer.append(WinnersPage.createListHeader());
    const allWinners = Crud.getAllWinners();
    allWinners.then((el) => {
      const winListHeaderCount = document.querySelector(".winListHeaderCount");
      const winListHeaderTime = document.querySelector(".winListHeaderTime");
      const winnersCount = el.length;
      const title = document.querySelector(".winnersTitle");
      let sorted: winner[];
      if (title) title.textContent = `WINNERS (${winnersCount})`;
      if (sessionStorage.getItem("sortWins") === App.sorted.up) {
        if (winListHeaderCount) winListHeaderCount.textContent = "WINS ↑";
        sorted = el.sort((win1: winner, win2: winner) =>
          win1.wins > win2.wins ? 1 : -1
        );
      } else if (sessionStorage.getItem("sortWins") === App.sorted.down) {
        if (winListHeaderCount) winListHeaderCount.textContent = "WINS ↓";
        sorted = el.sort((win1: winner, win2: winner) =>
          win1.wins > win2.wins ? -1 : 1
        );
      } else if (sessionStorage.getItem("sortTime") === App.sorted.up) {
        if (winListHeaderTime) winListHeaderTime.textContent = "BEST TIME ↑";
        sorted = el.sort((win1: winner, win2: winner) =>
          win1.time > win2.time ? 1 : -1
        );
      } else if (sessionStorage.getItem("sortTime") === App.sorted.down) {
        if (winListHeaderTime) winListHeaderTime.textContent = "BEST TIME ↓";
        sorted = el.sort((win1: winner, win2: winner) =>
          win1.time > win2.time ? -1 : 1
        );
      } else {
        sorted = el;
      }
      sorted.forEach((i, ind) => {
        const page = Number(sessionStorage.getItem(App.sessions.winPage));
        console.log("rend", page);
        if (ind >= page * 10 && ind < (page + 1) * 10) {
          winListContainer.append(WinnersPage.createWinnerBlock(i, ind));
        }
      });
    });
    const page = Number(sessionStorage.getItem(App.sessions.winPage));
    const pageNum = document.createElement("p");
    pageNum.className = "winPageNum pageNum";
    pageNum.textContent = `page #${page + 1}`;
    const title = WinnersPage.createHeaderTitle("WINNERS");
    const PrewNext = WinnersPage.createPrewNext();
    this.container.append(title, pageNum, winListContainer, PrewNext);
    return this.container;
  }
}

export default WinnersPage;
