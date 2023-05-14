export default class ProjectSwitvher {
  #telegram_bot_button;
  #django_webstore_button;
  #fast_api_task_manager_button;

  #telegram_bot_info;
  #django_webstore_info;
  #fast_api_task_manager_info;

  constructor() {
    this.#telegram_bot_button = document.getElementById('telegram-bot-button');
    this.#django_webstore_button = document.getElementById('django-webstore-button');
    this.#fast_api_task_manager_button = document.getElementById('fast-api-task-manager-button');

    this.#telegram_bot_info = document.getElementById('telegram-bot-info');
    this.#django_webstore_info = document.getElementById('django-webstore-info');
    this.#fast_api_task_manager_info = document.getElementById('fast-api-task-manager-info');
  }

  changeProjectMonitor() {
    /* 
        ОБЯЗАТЕЛЬНО bind, ИНАЧЕ БУДЕТ ОШИБКА, метод не понимает, что за контекст мы ему скармливаем в EventListener

        Либо можно заменить стрелочной функцией. Считается более новым решением. Но тут много изменений стилей, поэтмоу bind
    */

    this.#telegram_bot_button.addEventListener('click', this.#telegramBotChanger.bind(this));
    this.#django_webstore_button.addEventListener('click', this.#djangoWebstoreChanger.bind(this));
    this.#fast_api_task_manager_button.addEventListener('click', this.#fastApiTaskManagerChanger.bind(this));
  }

  #djangoWebstoreChanger() {
    this.#telegram_bot_info.style.marginLeft = '-80%';
    this.#telegram_bot_info.style.transition = 'all 1s ease';

    // if (this.#django_webstore_info.style.backgroundColor == 'red') {
    //   this.#django_webstore_info.style.backgroundColor = 'white';
    // } else {
    //   this.#django_webstore_info.style.cssText = newStyle;
    // }

    // const newStyle = `
    //   background-color: red;
    //   border: 10px solid black;
    // `;
    // this.#django_webstore_info.style.cssText = newStyle;
  }

  #telegramBotChanger() {
    this.#telegram_bot_info.style.marginLeft = '10%';
    this.#telegram_bot_info.style.transition = 'all 1s ease';
  }

  #fastApiTaskManagerChanger() {
    this.#telegram_bot_info.style.marginLeft = '-170%';
    this.#telegram_bot_info.style.transition = 'all 1s ease';
  }
}
