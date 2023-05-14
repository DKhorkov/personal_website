export default class OnStartUp {
  #startProgramming;
  #startWorking;
  #characteristics;
  #characteristicsTimer;

  constructor() {
    this.#startProgramming = new Date(2022, 4, 1); // Отсчет месяцев в JS идет с нуля
    this.#startWorking = new Date(2022, 9, 10);

    this.#characteristics = new Array('Problem solver', 'Builder', 'Team player', 'Developer');
    this.#characteristicsTimer = 1500;

    this.#initTimeVariables();
  }

  #initTimeVariables() {
    this._miliseconds = 1000;
    this._minutes = 60;
    this._seconds = 60;
    this._hours = 24;
    this._days = 30;
    this._months = 12;
    this._years = this._miliseconds * this._minutes * this._seconds * this._hours * this._days * this._months;
  }

  updateAboutInfoText() {
    let learningProgramming = (new Date() - this.#startProgramming) / this._years;
    let working = (new Date() - this.#startWorking) / this._years;
    let tag = document.getElementById('about-info-text');
    tag.innerHTML = `Занимаюсь программированием  ${learningProgramming.toFixed(2)} года, из которых 
    ${working.toFixed(2)} года enterprise разработкой в GameDev. <br />Параллельно изучаю и применяю технологии
    в рамках своих pet-проектов :)`;
  }

  viewCharacteristics() {
    // Обязательно делаем так, чтобы забиндить функцию, иначе error
    setInterval(this.#viewCharacteristicsFunc.bind(this), this.#characteristicsTimer);
  }

  #viewCharacteristicsFunc() {
    let test = document.getElementById('characteristics');
    test.innerHTML = this.#characteristics[0];
    let shifted = this.#characteristics.shift();
    this.#characteristics.push(shifted);
  }
}
