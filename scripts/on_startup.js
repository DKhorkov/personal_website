class onStartUp {
  #startProgramming;
  #startWorking;

  constructor() {
    this.#startProgramming = new Date(2022, 4, 1); // Отсчет месяцев в JS идет с нуля
    this.#startWorking = new Date(2022, 9, 10);
  }

  updateAboutInfoText() {
    let learningProgramming =
      (new Date() - this.#startProgramming) / (60 * 60 * 24 * 365 * 1000);
    let working =
      (new Date() - this.#startWorking) / (60 * 60 * 24 * 365 * 1000);
    let tag = document.getElementById('aboutInfoText');
    tag.innerHTML = `Занимаюсь программированием ${learningProgramming.toFixed(
      2
    )} года, из которых ${working.toFixed(2)} года enterprise
    разработкой в gameDev.
    <br />Параллельно изучаю и применяю технологии
    в рамках своих pet-проектов :)`;
  }
}

let startup = new onStartUp();
startup.updateAboutInfoText();
