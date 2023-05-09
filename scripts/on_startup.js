export default class onStartUp {
  #startProgramming;
  #startWorking;

  constructor() {
    this.#startProgramming = new Date(2022, 4, 1); // Отсчет месяцев в JS идет с нуля
    this.#startWorking = new Date(2022, 9, 10);

    this.initTimeVariables();
  }

  initTimeVariables() {
    // time variables
    this._miliseconds = 1000;
    this._minutes = 60;
    this._seconds = 60;
    this._hours = 24;
    this._days = 30;
    this._months = 12;
    this._years =
      this._miliseconds *
      this._minutes *
      this._seconds *
      this._hours *
      this._days *
      this._months;
  }

  updateAboutInfoText() {
    let learningProgramming =
      (new Date() - this.#startProgramming) / this._years;
    let working = (new Date() - this.#startWorking) / this._years;
    let tag = document.getElementById('aboutInfoText');
    tag.innerHTML = `Занимаюсь программированием ${learningProgramming.toFixed(
      2
    )} года, из которых ${working.toFixed(2)} года enterprise
    разработкой в GameDev.
    <br />Параллельно изучаю и применяю технологии
    в рамках своих pet-проектов :)`;
  }
}
