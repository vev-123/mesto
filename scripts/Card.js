class Card {
  constructor (cardDetails, cardSelector, handleFullScreen) {
    this._name = cardDetails.name;
    this._link = cardDetails.link;
    this._alt = cardDetails.name;
    this._cardSelector = cardSelector;
    this._element = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._handleFullScreen = handleFullScreen;
  }
  
  // лайки карточек
  _handleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
  
  // удаление карточек
  _handleRemove() {
    this._element.remove();
    this._element = null;
  }
  
  // слушатели карточек
  _addCardListeners() {
    this._likeButton.addEventListener('click', () => this._handleLike());
    this._deleteButton.addEventListener('click', () => this._handleRemove());
    this._image.addEventListener('click', () => this._handleFullScreen(this._link, this._name));
  }
  
  // рендер карточек
  renderCard() {
    this._addCardListeners();
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    return this._element;
  }
  
}

export {Card};