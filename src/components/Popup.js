class Popup {
  constructor (selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  // открытие попапов и навешивание слушателя на закрытие по эскейпу
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // закрытие попапов и снятие слушателя на закрытие по эскейпу
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // закрытие по эскейпу 
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // слушатель нажатия мыши на крестик или оверлей
  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}

export {Popup};