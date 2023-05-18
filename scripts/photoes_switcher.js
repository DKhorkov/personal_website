export default class photoesSwtitcher {
  #next_buttons;
  #previous_buttons;

  #tg_bot_photoes_list;
  #tg_bot_current_index;

  constructor() {
    this.#next_buttons = document.querySelectorAll('.next_photo');
    this.#previous_buttons = document.querySelectorAll('.previous_photo');

    // ... - распаковка объекта по ключам. [] - что-то вроде  list comprehension
    this.#tg_bot_photoes_list = [...Array(4).keys()];
    this.#tg_bot_current_index = 0;
  }

  changePhotoes() {
    this.#next_buttons.forEach((button) => {
      button.addEventListener('click', this.#nextPhoto.bind(this));
    });

    // this.#previous_buttons.forEach((button) => {
    //   button.addEventListener('click', this.#previousPhoto.bind(this));
    // });
  }

  #nextPhoto(event) {
    const target_ids = ['telegram-bot-photoes'];
    if (event.target.parentNode.parentNode.id == target_ids[0]) {
      this.#tg_bot_current_index = this.#changePhoroToNextFromList(
        this.#tg_bot_photoes_list,
        this.#tg_bot_current_index,
        target_ids[0]
      );
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
}
