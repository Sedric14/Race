/* eslint-disable import/no-cycle */
import App from "./app";

class MessageRender {
  static winnerMessage(name: string, time: number) {
    const messCont = document.createElement("div");
    messCont.className = "messCont";
    messCont.textContent = `${name} went first [${time}sec] !`;
    return messCont;
  }

  static maintenance() {
    const field = document.createElement("div");
    field.className = "field";
    const window = document.createElement("div");
    window.className = "window";
    window.textContent =
      "Sorry, but the cars you have chosen haven't yet reached the end of the track or are being serviced. You can wait or choose cars from another garage";
    const btnOk = document.createElement("div");
    btnOk.className = "btnOk btnOne";
    btnOk.textContent = "OK";
    window.append(btnOk);
    field.append(window);
    App.bodyContainer.append(field);
  }
}

export default MessageRender;
