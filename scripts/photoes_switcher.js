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

  #photoes_to_popup;

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

    this.#photoes_to_popup = document.querySelectorAll('.project_photoes_container');
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

  listenForPopups() {
    this.#photoes_to_popup.forEach((photo) => {
      photo.addEventListener('click', this.#createPopup.bind(this));
    });
  }

  #createPopup(ev) {
    let target_id;
    let photo_index;

    switch (ev.target.parentNode.id) {
      case this.#target_ids[0]:
        target_id = this.#target_ids[0];
        photo_index = this.#tg_bot_current_index;
        break;
      case this.#target_ids[1]:
        target_id = this.#target_ids[1];
        photo_index = this.#tg_bot_current_index;
        break;
      case this.#target_ids[2]:
        target_id = this.#target_ids[2];
        photo_index = this.#tg_bot_current_index;
        break;
    }

    const oGallery = document.querySelector('body');
    let oTarget = ev.target;
    let oBig = ev.target.appendChild(document.createElement('DIV'));
    oBig.style.position = `absolute`;
    oBig.style.top = `${oTarget.offsetTop}px`;
    oBig.style.left = `${oTarget.offsetLeft}px`;
    oBig.style.width = `${oTarget.offsetWidth}px`;
    oBig.style.height = `${oTarget.offsetHeight}px`;
    oBig.style.marginLeft = '-10.5%';
    oBig.style.marginTop = '-2%';

    let top = Number(oBig.style.top.replace('px', ''));
    let left = Number(oBig.style.left.replace('px', ''));
    window.scrollTo(top, left * 1.69);

    oBig.style.background = `center / 100% 100% no-repeat url('../images/${target_id}/${photo_index}.png')`;
    oBig.insertAdjacentHTML('beforeend', '<div class="close">×</div>');
    oBig.addEventListener('transitionend', function () {
      this.querySelector('.close').style.opacity = 1;
    });
    oBig.addEventListener('click', function (ev) {
      ev.stopPropagation();
      this.addEventListener('transitionend', function () {
        this.remove();
      });
      this.style.transition = `.5s ease-in`;
      this.style.height = this.style.width = `0px`;
      oGallery.classList.toggle('show', false);
      window.onscroll = null;
    });
    oBig.classList.toggle('active_popup');
    oBig.style.transform = `scale(2.1, 1.3)`;
    oGallery.classList.toggle('show', true);
    window.onscroll = function () {
      window.scrollTo(top, left * 1.69);
    };
  }
}
