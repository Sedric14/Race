// eslint-disable-next-line prettier/prettier
abstract class Page {
  container: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
  }

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}
export default Page;
