import {profileEditButton, profileAddButton, elementsContainer, userNameInput, 
        userProfessionInput, formProfile, formAddCard, initialCards, 
        formValidationConfig, userName, userInfo} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import './index.css';


// валидация формы профайла
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
profileFormValidator.enableValidation();

// валидация формы добавления карточек
const cardFormValidator = new FormValidator(formValidationConfig, formAddCard);
cardFormValidator.enableValidation();

// фулскрин кртинка
const imageFullScreen = new PopupWithImage('.popup_fullscreen-card');

// данные пользователя
const user = new UserInfo({userName, userInfo});

// карточки
const defaultCardList = new Section({
    items: initialCards,
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    }
  },
  elementsContainer
);
defaultCardList.renderItems();

// создание карточки через класс Card
function createCard(cardDetails) {
  const card = new Card(cardDetails, '.template', function handleFullScreen() {
    imageFullScreen.open(cardDetails);
  });
  const cardElement = card.renderCard();
  return cardElement;
}

// попап профайла
const profilePopup = new PopupWithForm('.popup_edit-profile', (data) => {
  user.setUserInfo(data);
})

//попап карточки
const cardPopup = new PopupWithForm('.popup_add-card', (cardDetails) => {
  defaultCardList.addItem(createCard(cardDetails));
})

// открытие попапов по клику
profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetErrorValidation();
  const userData = user.getUserInfo();
  userNameInput.value = userData.name;
  userProfessionInput.value = userData.profession;
  profilePopup.open();
});

profileAddButton.addEventListener('click', () => {
  cardFormValidator.resetErrorValidation();
  cardPopup.open();
});