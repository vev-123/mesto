// выбираем попапы
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupProfileAvatar = document.querySelector('.popup_change-avatar');

// выбираем кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardDeleteButton = document.querySelector('#delete-card');
const avatarEditButton = document.querySelector('.profile__hover');
const buttonPopupSubmit = ".popup__submit";

// выбираем elements и template для добавления карточек
const elementsContainer = document.querySelector('.elements');

// выбираем инпуты в попапе редактирования профиля
const userNameInput = document.querySelector('.popup__input_data_name');
const userProfessionInput = document.querySelector('.popup__input_data_profession');

// выбор форм
const formProfile = document.querySelector('#edit-form');
const formAddCard = document.querySelector('#add-card-form');
const formAvatar = document.querySelector('#avatar-form');



// выбор имени и профессии профайла
const userName = '.profile__title';
const userInfo = '.profile__subtitle';

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

const formValidationConfig = {
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_disabled',
};

export {
  profileEditButton,
  profileAddButton,
  elementsContainer,
  userNameInput,
  userProfessionInput,
  formProfile,
  formAddCard,
  initialCards,
  formValidationConfig,
  userName,
  userInfo,
  cardDeleteButton,
  avatarEditButton,
  popupEditProfile,
  popupAddCard,
  popupProfileAvatar,
  buttonPopupSubmit,
  formAvatar
}
