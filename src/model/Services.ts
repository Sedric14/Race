class Services {
  static baseUrl = "http://127.0.0.1:3000";
  static path = {
    garage: "/garage",
    winners: "/winners",
  };

  public static async create() {
    console.log(45);
    
    const inputName = document.querySelector(".inputTopCont") as HTMLInputElement;
    const name = inputName.value;
    const color = "#fff000";
    const car = {
      name: `${name}`,
      color: `${color}`,
    };
    
    const response = await fetch(`${Services.baseUrl}${Services.path.garage}/7`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(car)
    });
    
    let result = await response.json();
    console.log(result);
  }

  public static async update() {
    const response = await fetch(`${Services.baseUrl}${Services.path.garage}`)
    const data = response.json();
    console.log(data);
    
  }
}

export default Services;