export default class ProjectSwitvher {
  #buttons;
  #active_button;
  #telegram_bot_info;

  constructor() {
    this.#buttons = document.querySelectorAll('.projects-button'); // находим все объекты с определенным классом
    this.#active_button = this.#buttons[0]; // активная кнопка со старта
    this.#telegram_bot_info = document.getElementById('telegram-bot-info');
  }

  changeProjectMonitor() {
    // итерируем по всем кнопкам с найденным классом и навешиваем addEventListener
    this.#buttons.forEach((button) => {
      button.addEventListener('click', this.#handleBurronClick.bind(this));
    });
  }

  #handleBurronClick(event) {
    /*
      Удаляем у текущей активной кнопки класс active и навешиваем его на кнопку, которую нажали. 
      Плюс заменяем нажатую кнопку в памяти
    */
    this.#active_button.classList.remove('active');
    event.target.classList.add('active');
    this.#active_button = event.target;

    // Двигаем наши контейнеры с проектами
    if (event.target.innerHTML == 'PlantsCareBot') {
      this.#telegram_bot_info.style.cssText = this.#prepareCssText({ marginLeftInPercent: 10 }); // синтаксис kwargs
    } else if (event.target.innerHTML == 'NataliaToys') {
      this.#telegram_bot_info.style.cssText = this.#prepareCssText({ marginLeftInPercent: -80 });
    } else {
      this.#telegram_bot_info.style.cssText = this.#prepareCssText({ marginLeftInPercent: -170 });
    }
  }

  #prepareCssText(options) {
    const cssText = `
      margin-left: ${options.marginLeftInPercent}%;
      transition: all 1s ease;
    `;

    return cssText;
  }
}
