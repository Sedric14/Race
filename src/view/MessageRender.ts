class MessageRender{

  public static render(name: string, time: number){
    const messCont = document.createElement("div");
    messCont.className = "messCont";
    messCont.textContent = `${name} went first [${time}sec] !`;
    return messCont;
  }
}

export default MessageRender;