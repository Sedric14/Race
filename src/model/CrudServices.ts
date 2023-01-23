/* eslint-disable import/no-cycle */
/* eslint-disable prettier/prettier */
import Listeners from "../controller/Listeners";
import { body, car, engine, winner } from "./Interfaces";
import Services from "./Services";

class Crud {
  static baseUrl = "http://127.0.0.1:3000";

  static path = {
    garage: "/garage",
    winners: "/winners",
    engine: "/engine",
  };


  static async runStop(id: number, status: string) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const result: engine = await response.json();
    return result;
  }

  static async driveStatus(id: number, status: string) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const stat = response.status;
    return stat;
  }

  static async createCar(newCar: car) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(newCar)
    });
    return response.json();
  }

  static async updateCar() {
    const inputName = document.querySelector(".inputMiddleCont")as HTMLInputElement;
    const inputColor = document.querySelector(".colorMiddleCont")as HTMLInputElement;
    const upCar: car = {
      id: Listeners.updatingCar.id,
      name: inputName.value,
      color: inputColor.value,
    };
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${upCar.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(upCar)
    });
    return response.json();
  }

  static async updateWin(id: number, Body: body) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Body)
    });
    return response.json();
  }

  static async getAllCar() {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}`);
    const result: car[] = await response.json();
    return result;
  }

  static async deleteCar(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
    Crud.deleteWin(id);
    Services.updateGaragePage();
    return response.json();
  }

  static async deleteWin(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
    return response.json();
  }

  static async getAllWinners() {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}`);
    const result: winner[] = await response.json();
    return result;
  }

  static async getCar(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${id}`);
    const result = await response.json() as car;
    return result;
  }

  static async getWin(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}/${id}`);
    const result = await response.json() as winner;
    return result;
  }

  static async createWinner(Winner: winner){
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(Winner)
    });
    return response.json();
  }

}

export default Crud;