/* eslint-disable prettier/prettier */
import Page from "./page";

export const enum ErrorTypes {
  Error_404 = 404,
}

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: { [prop: string]: string } = {
    "404": "Error! The page was not found.",
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  static createHeaderTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.textContent = text;
    return headerTitle;
  }

  render() {
    const title = ErrorPage.createHeaderTitle(
      ErrorPage.TextObject[this.errorType]
    );
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
