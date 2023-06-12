class CallFormHandler {
  #mainUrl;
  #callFormUrl;
  #callForm;

  constructor() {
    this.#mainUrl = 'http://D3M0S-World:8090/';
    this.#callFormUrl = this.#mainUrl + 'create_call_application';

    this.#callForm = document.querySelector('#call-form');
    this.#callForm.addEventListener('submit', this.#handleSumbit.bind(this), false);
  }

  #handleSumbit(event) {
    event.preventDefault();
    this.#processForm(event.target);
  }

  #processForm(form) {
    let [person_name, phone_number, date_for_call] = this.#getFormData(form);

    this.#sendDataToBackend(person_name, phone_number, date_for_call);
  }

  #getFormData(form) {
    let person_name = this.#getInputValueByName(form, 'person_name');
    let phone_number = this.#getInputValueByName(form, 'phone_number').replaceAll('-', '');
    let date_for_call = this.#getInputValueByName(form, 'date_for_call').replace('T', ' ');

    return [person_name, phone_number, date_for_call];
  }

  #getInputValueByName(form, name) {
    for (let index = 0; index < form.elements.length; index++) {
      let element_name = form.elements[index].name;
      if (element_name == name) {
        return form.elements[index].value;
      }
    }
  }

  async #sendDataToBackend(person_name, phone_number, date_for_call) {
    const response = await fetch(this.#callFormUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: person_name,
        phone: phone_number,
        call_date: date_for_call,
      }),
    }).then((response) => response.json());

    if ((response.validation_error == false) & (response.status == true)) {
      alert('Заявка на звонок была успешно отправлена :)');
    } else {
      alert('Не удалось отправить заявку на звонок в связи с ошибкой сервера :(');
    }
  }
}

function personNameValidation(event) {
  event.target.setCustomValidity('Пожалуйста, введите имя от 2 до 40 символов!');
}

export { CallFormHandler, personNameValidation };
