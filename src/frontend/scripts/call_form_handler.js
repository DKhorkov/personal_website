export default class CallFormHandler {
  #callForm;

  constructor() {
    this.#callForm = document.querySelector('#call-form');
    this.#callForm.addEventListener('submit', this.#handleSumbit.bind(this), false);

    this.#handleInvalidInputs();
  }

  #handleInvalidInputs() {
    const inputs_4_validation = document.querySelectorAll('input[data-validation]');
    inputs_4_validation.forEach((input) => {
      input.addEventListener('invalid', this.#onInputValidation);
      input.addEventListener('input', this.#resetCustomValidity);
    });
  }

  #onInputValidation(event) {
    event.target.setCustomValidity(event.target.dataset.validation);
  }

  #resetCustomValidity(event) {
    event.target.setCustomValidity('');
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
    const response = await fetch(`create_call_application`, {
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
      document.forms[0].reset();
    } else {
      alert('Не удалось отправить заявку на звонок в связи с ошибкой сервера :(');
    }
  }
}
