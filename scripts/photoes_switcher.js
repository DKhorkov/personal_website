export default class photoesSwtitcher {
  #target_ids;

  #next_buttons;
  #previous_buttons;

  #tg_bot_photoes_list;
  #tg_bot_current_index;

  #django_webstore_photoes_list;
  #django_webstore_current_index;

  #fast_api_task_manager_photoes_list;
  #fast_api_task_manager_current_index;

  constructor() {
    this.#target_ids = ['telegram-bot-photoes', 'django-webstore-photoes', 'fast-api-task-manager-photoes'];

    this.#next_buttons = document.querySelectorAll('.next_photo');
    this.#previous_buttons = document.querySelectorAll('.previous_photo');

    // ... - распаковка объекта по ключам. [] - что-то вроде  list comprehension
    this.#tg_bot_photoes_list = [...Array(4).keys()];
    this.#tg_bot_current_index = 0;

    this.#django_webstore_photoes_list = [...Array(4).keys()];
    this.#django_webstore_current_index = 0;

    this.#fast_api_task_manager_photoes_list = [...Array(4).keys()];
    this.#fast_api_task_manager_current_index = 0;
  }

  changePhotoes() {
    this.#next_buttons.forEach((button) => {
      button.addEventListener('click', this.#nextPhoto.bind(this));
    });

    this.#previous_buttons.forEach((button) => {
      button.addEventListener('click', this.#previousPhoto.bind(this));
    });
  }

  #nextPhoto(event) {
    switch (event.target.parentNode.parentNode.id) {
      case this.#target_ids[0]:
        this.#tg_bot_current_index = this.#changePhoroToNextFromList(
          this.#tg_bot_photoes_list,
          this.#tg_bot_current_index,
          this.#target_ids[0]
        );
        break;
      case this.#target_ids[1]:
        this.#django_webstore_current_index = this.#changePhoroToNextFromList(
          this.#django_webstore_photoes_list,
          this.#django_webstore_current_index,
          this.#target_ids[1]
        );
        break;
      case this.#target_ids[2]:
        this.#fast_api_task_manager_current_index = this.#changePhoroToNextFromList(
          this.#fast_api_task_manager_photoes_list,
          this.#fast_api_task_manager_current_index,
          this.#target_ids[2]
        );
        break;
    }
  }

  #changePhoroToNextFromList(photoes_list, current_photo_index, target_id) {
    let next_photo_index;
    try {
      next_photo_index = photoes_list[++current_photo_index];
      if (next_photo_index == undefined) {
        throw Error;
      }
    } catch (error) {
      next_photo_index = 0;
    }

    document.getElementById(target_id).style.backgroundImage = `url('../images/${target_id}/${next_photo_index}.png')`;

    return next_photo_index;
  }

  #previousPhoto(event) {
    switch (event.target.parentNode.parentNode.id) {
      case this.#target_ids[0]:
        this.#tg_bot_current_index = this.#changePhoroToPreviousFromList(
          this.#tg_bot_photoes_list,
          this.#tg_bot_current_index,
          this.#target_ids[0]
        );
        break;
      case this.#target_ids[1]:
        this.#django_webstore_current_index = this.#changePhoroToPreviousFromList(
          this.#django_webstore_photoes_list,
          this.#django_webstore_current_index,
          this.#target_ids[1]
        );
        break;
      case this.#target_ids[2]:
        this.#fast_api_task_manager_current_index = this.#changePhoroToPreviousFromList(
          this.#fast_api_task_manager_photoes_list,
          this.#fast_api_task_manager_current_index,
          this.#target_ids[2]
        );
        break;
    }
  }

  #changePhoroToPreviousFromList(photoes_list, current_photo_index, target_id) {
    let previous_photo_index;
    try {
      previous_photo_index = photoes_list[--current_photo_index];
      if (previous_photo_index == undefined) {
        throw Error;
      }
    } catch (error) {
      // Тут нужна именно распаковка для корректной работы метода max() модуля Math
      previous_photo_index = Math.max(...photoes_list);
    }

    document.getElementById(
      target_id
    ).style.backgroundImage = `url('../images/${target_id}/${previous_photo_index}.png')`;

    return previous_photo_index;
  }
}
