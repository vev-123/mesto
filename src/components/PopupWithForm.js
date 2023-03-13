import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor (selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._inputValues = {};
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}

export {PopupWithForm};