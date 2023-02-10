// общая функция добавления класса для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

//вставляем в инпуты имя и профессию из профиля
function insertUserInfoInputs () {
  userNameInput.value = profileName.textContent;
  userProfessionInput.value = profileProfession.textContent;
}

// открытие попапа редактирования профиля (одновременно вставляет в инпуты имя и профессию из профиля)
function openPopupEditProfile () {
  insertUserInfoInputs();
  openPopup(popupEditProfile);
}

// открытие попапа добавления карточки
function openPopupAddCard () {
  openPopup(popupAddCard);
}

// общая функция закрытия попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// закрытие попапа профиля
function closePopupEditProfile () {
  closePopup(popupEditProfile);
}

// закрытие попапа добавления карточки
function closePopupAddCard() {
  closePopup(popupAddCard);
}

// закрытие всех попапов по Esc
function closePopupByEscape (event) {
  if (event.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// внесение данных в профиль и сохранение их
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileProfession.textContent = userProfessionInput.value;
  closePopupEditProfile();
}

// карточки передаются в контейнер
function addCardToContainer(container, card) {
  container.prepend(card);
}

// подготовка карточек
function render() {
  initialCards.forEach((card) => {
    const startCard = createCard(card);
    addCardToContainer(elementsContainer, startCard);
  });
}

// вызываем карточкм
render();

// добавление новых карточек
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeNameInput.value, link: placeLinkInput.value, alt: placeNameInput.value});
  addCardToContainer(elementsContainer, newCard);
  closePopupAddCard();
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

// лайки
function handleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

// удаление карточек
function handleRemove(evt) {
  evt.target.closest('.element').remove();
}

// переход в карточку на весь экран
function handleFullScreen(cardData) {
  const picture = popupFullScreen.querySelector('.popup__picture');
  const pictureCaption = popupFullScreen.querySelector('.popup__figcaption');
  picture.src = cardData.link;
  picture.alt = cardData.name;
  pictureCaption.textContent = picture.alt;
  openPopup(popupFullScreen);
}

// слушатели карточек
function addCardListeners(element, cardData) {
  element.querySelector('.element__like-button').addEventListener('click', (evt) => {
    handleLike(evt);
  });
  element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
    handleRemove(evt);
  });
  element.querySelector('.element__image').addEventListener('click', () => {
    handleFullScreen(cardData);
  }); 
}

// каждая карточка проходит через шаблон
function createCard(card) {
  const newCard = templateCard.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__image').src = card.link;
  newCard.querySelector('.element__image').alt = card.name;
  addCardListeners(newCard, card);
  return newCard;
}

// закрытие всех попапов по клику на крестик
popupCloseButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие всех попапов по клику на оверлей
popupElement.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  })
});

// открытие попапов по клику
profileEditButton.addEventListener('click', openPopupEditProfile);
profileAddButton.addEventListener('click', openPopupAddCard);
// сохранить профиль по клику
popupEditProfile.addEventListener('submit', handleFormSubmit);
// сохранить карточку по клику
popupAddCard.addEventListener('submit', handleAddCard);