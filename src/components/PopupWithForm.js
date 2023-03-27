import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor (selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputValues = {};
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  // закрытие и сброс формы
  close() {
    super.close();
    this._form.reset();
  }

  // обработчик клика иконке закрытия и обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
}

export {PopupWithForm};