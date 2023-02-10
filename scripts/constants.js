// выбираем имя и профессию а профиле
const profileName = document.querySelector('.profile__title');
const profileProfession = document.querySelector('.profile__subtitle');

// выбираем кнопки в profile
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//выбираем попапы
const popupElement = document.querySelectorAll('.popup');
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