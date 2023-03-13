// выбираем имя и профессию а профиле
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

// выбираем кнопки в profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//выбираем попапы
const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullScreen = document.querySelector('.popup_fullscreen-card');

// выбираем кнопку закрытия в попапах
const popupCloseButtons = document.querySelectorAll('.popup__close-button')

// выбираем elements и template для добавления карточек
const elementsContainer = document.querySelector('.elements');

// выбираем инпуты в попапе редактирования профиля
const userNameInput = document.querySelector('.popup__input_data_name');
const userProfessionInput = document.querySelector('.popup__input_data_profession');

// выбираем инпуты в попапе добавления карточек
const placeNameInput = document.querySelector('.popup__input_data_place');
const placeLinkInput = document.querySelector('.popup__input_data_link');

// выбираем картинку и подпись к ней для попапа на весь экран
const picture = popupFullScreen.querySelector('.popup__picture');
const pictureCaption = popupFullScreen.querySelector('.popup__figcaption');

// выбор форм
const formProfile = document.querySelector('#edit-form');
const formAddCard = document.querySelector('#add-card-form');

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
  profileName, 
  profileProfession,
  profileEditButton,
  profileAddButton,
  popups,
  popupEditProfile,
  popupAddCard,
  popupFullScreen,
  popupCloseButtons,
  elementsContainer,
  userNameInput,
  userProfessionInput,
  placeNameInput,
  placeLinkInput,
  picture,
  pictureCaption,
  formProfile,
  formAddCard,
  initialCards,
  formValidationConfig,
  userName,
  userInfo
}
