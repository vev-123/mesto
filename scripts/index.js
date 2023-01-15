// выбираем имя и профессию а профиле
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

// выбираем кнопки в profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//выбираем попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullScreen = document.querySelector('.popup_fullscreen-card');

// выбираем кнопку закрытия в попапах
const popupCloseButton = document.querySelectorAll('.popup__close-button')

// выбираем elements и template для добавления карточек
const templateCard = document.querySelector('.template').content;
const elementsContainer = document.querySelector('.elements');

// выбираем инпуты в попапе редактирования профиля
const userNameInput = document.querySelector('.popup__input_data_name');
const userProfessionInput = document.querySelector('.popup__input_data_profession');

// выбираем инпуты в попапе добавления карточек
const placeNameInput = document.querySelector('.popup__input_data_place');
const placeLinkInput = document.querySelector('.popup__input_data_link');

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// общая функция добавления класса для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

//вставляем в инпуты имя и профессию из профиля
function readInformation() {
  userNameInput.value = profileName.textContent;
  userProfessionInput.value = profileProfession.textContent;
}

// открытие попапа редактирования профиля (одновременно вставляет в инпуты имя и профессию из профиля)
function openPopupEditProfile () {
  readInformation();
  openPopup(popupEditProfile);
}

// открытие попапа добавления карточки
function openPopupAddCard () {
  openPopup(popupAddCard);
}

// общая функция закрытия попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// закрытие попапа профиля
function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

// закрытие попапа добавления карточки
function closePopupAddCard() {
  closePopup(popupAddCard);
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
function addListeners(element, cardData) {
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
  addListeners(newCard, card);
  return newCard;
}

// открытие попапов по клику
profileEditButton.addEventListener('click', openPopupEditProfile);
profileAddButton.addEventListener('click', openPopupAddCard);

// закрытие всех попапов по клику на крестик
popupCloseButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// сохранить профиль по клику
popupEditProfile.addEventListener('submit', handleFormSubmit);
// сохранить карточку по клику
popupAddCard.addEventListener('submit', handleAddCard);