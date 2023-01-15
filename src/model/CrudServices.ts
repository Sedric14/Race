import App from "../view/app/app";
import GaragePage from "../view/garageRender";
import { car } from "./Interfaces";

class Crud {
  static baseUrl = "http://127.0.0.1:3000";
  static path = {
    garage: "/garage",
    winners: "/winners",
  };
  // static garagePage = new GaragePage("garage");

  public static async createCar(car: car) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(car)
    });

    let result = await response.json();
    App.renderNewPage("garage")
  }

  public static async updateCar(car: car) {
    const response = await fetch(`${Crud.baseUrl}${Crud.path.garage}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(car)
    });

    let result = await response.json();
    App.renderNewPage("garage")
  }

  public static async getAllCar(){
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

    let result = await response.json();
    App.renderNewPage("garage")
  }

}

export default Crud;