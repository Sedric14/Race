/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Crud from "../model/CrudServices";
import { winner } from "../model/Interfaces";
import Page from "./app/page";

class WinnersPage extends Page {

  static page: number = 0;

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.className = "titlePage winnersTitle"
    headerTitle.textContent = text;
    return headerTitle;
  }

  static createWinnerBlock(winner: winner, ind: number){
    const winnerBlock = document.createElement("div");
    winnerBlock.className = "winnerBlock";
    const winNum = document.createElement("p");
    winNum.className = "winNum";
    winNum.textContent = `${ind + 1}`
    const winImage = document.createElement("div");
    winImage.className = "winImage";
    const winName = document.createElement("p");
    winName.className = "winName";
    const winCount = document.createElement("p");
    winCount.className = "winCount";
    winCount.textContent = `${winner.wins}`
    const winTime = document.createElement("p");
    winTime.className = "winTime";
    winTime.textContent = `${winner.time}`
    const winnerCar = Crud.getCar(winner.id);
    winnerCar.then((el) => {
      winImage.style.backgroundColor = `${el.color}`;
      winName.textContent = `${el.name}`
    });
    winnerBlock.append(winNum, winImage, winName, winCount, winTime)
    return winnerBlock;
  }

  static createListHeader(){
    const winListHeader = document.createElement("div");
    winListHeader.className = "winListHeader";
    const winListHeaderNum = document.createElement("div");
    winListHeaderNum.className = "winListHeaderNum";
    winListHeaderNum.textContent = "№";
    const winListHeaderImage = document.createElement("div");
    winListHeaderImage.className = "winListHeaderImage";
    winListHeaderImage.textContent = "CAR";
    const winListHeaderName = document.createElement("div");
    winListHeaderName.className = "winListHeaderName";
    winListHeaderName.textContent = "NAME";
    const winListHeaderCount = document.createElement("div");
    winListHeaderCount.className = "winListHeaderCount";
    winListHeaderCount.textContent = "WINS"
    const winListHeaderTime = document.createElement("div");
    winListHeaderTime.className = "winListHeaderTime";
    winListHeaderTime.textContent = "BEST TIME"
    winListHeader.append(winListHeaderNum, winListHeaderImage, 
      winListHeaderName, winListHeaderCount, winListHeaderTime);
      return winListHeader;
  }

  render() {
    const winListContainer = document.createElement("div");
    winListContainer.className = "winListContainer";
    winListContainer.append(WinnersPage.createListHeader())
    let allWinners = Crud.getAllWinners();
    allWinners.then((el) => {
      let winnersCount = el.length;
      const title = document.querySelector(".winnersTitle")
      if (title) title.textContent = `WINNERS (${winnersCount})`;
      el.forEach((i, ind) => {
        if(ind >= (WinnersPage.page * 10) && ind < ((WinnersPage.page + 1) * 10)){
          winListContainer.append(WinnersPage.createWinnerBlock(i, ind));
        }
      })
    })
    const pageNum = document.createElement("p");
    pageNum.className = "pageNum";
    pageNum.textContent = `page #${WinnersPage.page + 1}`;
    const title = WinnersPage.createHeaderTitle("WINNERS");
    this.container.append(title, pageNum, winListContainer);
    return this.container;
  }
}

export default WinnersPage;
