import {profileName, profileProfession, profileEditButton, profileAddButton, popups, popupEditProfile, popupAddCard, popupFullScreen, popupCloseButtons, elementsContainer, userNameInput, userProfessionInput, placeNameInput, placeLinkInput, picture, pictureCaption, formProfile, formAddCard, initialCards, formValidationConfig} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// валидация формы профайла
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
profileFormValidator.enableValidation();

// валидация формы добавления карточек
const cardFormValidator = new FormValidator(formValidationConfig, formAddCard);
cardFormValidator.enableValidation();

// создание карточки через класс Card
function createCard(cardDetails) {
  const card = new Card(cardDetails, '.template', handleFullScreen);
  const cardElement = card.renderCard();
  return cardElement;
}

// карточки передаются в контейнер
function addCardToContainer(container, card) {
  container.prepend(card);
}

// подготовка карточек
initialCards.forEach((card) => {
  const startCard = createCard(card);
  addCardToContainer(elementsContainer, startCard);
});

// добавление новых карточек
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeNameInput.value, link: placeLinkInput.value, alt: placeNameInput.value});
  addCardToContainer(elementsContainer, newCard);
  closePopup(popupAddCard);
}

// переход в карточку на весь экран
function handleFullScreen(link, name) {
  picture.src = link;
  picture.alt = name;
  pictureCaption.textContent = picture.alt;
  openPopup(popupFullScreen);
}


// общая функция добавления класса для открытия попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  profileFormValidator.resetError(); // очистка ошибок валидации при повторном открытии
  cardFormValidator.resetError(); // очистка ошибок валидации при повторном открытии
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
  formAddCard.reset(); //очистка инпутов при каждом открытии
}


// общая функция закрытия попапов
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// закрытие всех попапов по Esc
function closePopupByEscape (event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}


// внесение данных в профиль и сохранение их
function submitEditProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileProfession.textContent = userProfessionInput.value;
  closePopup(popupEditProfile);
}


// закрытие всех попапов по клику на крестик
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// закрытие всех попапов по клику на оверлей
popups.forEach((popup) => {
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
popupEditProfile.addEventListener('submit', submitEditProfileForm);
// сохранить карточку по клику
popupAddCard.addEventListener('submit', handleAddCard);