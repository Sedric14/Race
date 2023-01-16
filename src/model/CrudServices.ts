import Listeners from "../controller/Listeners";
import App from "../view/app/app";
import GaragePage from "../view/garageRender";
import { car, engine, winner } from "./Interfaces";
import Services from "./Services";

class Crud {
  static baseUrl = "http://127.0.0.1:3000";
  static path = {
    garage: "/garage",
    winners: "/winners",
    engine: "/engine",
  };


  public static async runStop(id: number, status: string) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    let result = await response.json() as engine;
    return result;
  }

  public static async driveStatus(id: number, status: string) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.engine}?id=${id}&status=${status}`, {
      method: 'PATCH',
    });
    const stat = response.status;
    return stat;
  }

  public static async createCar(car: car) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(car)
    });
    App.renderNewPage("garage")
  }

  public static async updateCar() {
    const inputName = document.querySelector(".inputMiddleCont") as HTMLInputElement;
    const inputColor = document.querySelector(".colorMiddleCont") as HTMLInputElement;
    const car: car = {
      id: Listeners.updatingCar.id as number,
      name: inputName.value,
      color: inputColor.value,
    };
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(car)
    });
    App.renderNewPage("garage")
  }

  public static async getAllCar() {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}`);
    let result = await response.json() as car[];
    return result;
  }

  public static async deleteCar(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
    });
    App.renderNewPage("garage")
  }

  public static async getAllWinners() {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.winners}`);
    let result = await response.json() as winner[];
    return result;
  }

  public static async getCar(id: number) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${id}`);
    let result = await response.json() as car;
    return result;
  }

}

export default Crud;