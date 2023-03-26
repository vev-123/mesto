class Card {
  constructor (cardDetails, cardSelector, handleFullScreen, handleDeleteCard, handleLike, getUserId) {
    this._name = cardDetails.name;
    this._link = cardDetails.link;
    this._alt = cardDetails.name;
    this._like = cardDetails.likes;
    this._idCard = cardDetails._id;
    this._idOwner = cardDetails.owner;
    this._cardSelector = cardSelector;
    this._handleFullScreen = handleFullScreen;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
    this._userId = getUserId;
    this._isLiked = false;
    this._element = this._getTemplate();
    this._likeCount = this._element.querySelector('.element__num-like');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _checkIdUser() {
    if (this._idOwner === this._userId) {
      this._deleteButton.classList.add('element__delete-button_visible');
    }
  }

  _setLikeBtn() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _unsetLikeBtn() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  setLike(like) {
    this._likeCount.textContent = like.length;
    this._like = like;
    this.toggleLike();
  }

  isLiked() {
    return this._like.find((item) => item._id === this._userId);
  }

  toggleLike() {
    if (this.isLiked()) {
      this._setLikeBtn();
    } else {
      this._unsetLikeBtn();
    }
  }
  
  // слушатели карточек
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLike(this));
    this._deleteButton.addEventListener('click', () => this._handleDeleteCard(this));
    this._image.addEventListener('click', () => this._handleFullScreen());
  }
  
  // рендер карточек
  renderCard() {
    this._setEventListeners();
    this._checkIdUser();
    this.toggleLike();
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeCount.textContent = this._like.length;

    return this._element;
  }
  
}

export {Card};