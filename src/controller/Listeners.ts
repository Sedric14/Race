import Services from "../model/Services";

class Listeners{
  public static create(): void {
    console.log(34);
    
    const btnTopCont = document.querySelector(".btnTopCont");
    btnTopCont?.addEventListener("click", () => {
      Services.create()});

    const btnMiddleCont = document.querySelector(".btnMiddleCont");
    btnMiddleCont?.addEventListener("click", Services.update);
  }
}

export default Listeners;