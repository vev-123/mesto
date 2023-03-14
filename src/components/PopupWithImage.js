import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._picture = this._popup.querySelector('.popup__picture');
    this._pictureCaption = this._popup.querySelector('.popup__figcaption');
  }

  // вставляет в попап картинку, альт и подпись
  open(data) {
    super.open();
    this._picture.src = data.link;
    this._picture.alt = data.name
    this._pictureCaption.textContent = data.name; 
  }
}

export {PopupWithImage};