class Popup {
  constructor (selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this.setEventListeners();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      if(event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}

export {Popup};