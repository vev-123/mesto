import {profileEditButton, profileAddButton, elementsContainer, userNameInput, 
        userProfessionInput, formProfile, formAddCard, initialCards, 
        formValidationConfig, userName, userInfo, cardDeleteButton, avatarEditButton,
        popupEditProfile, popupAddCard, popupProfileAvatar, buttonPopupSubmit,
        formAvatar} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";

import './index.css';

// фулскрин кртинка
const imageFullScreen = new PopupWithImage('.popup_fullscreen-card');

// данные пользователя
const user = new UserInfo({userName, userInfo});

// авторизация на сервере
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '5796e980-7e18-4e30-85fb-b7021ed33ad1',
    'Content-Type': 'application/json',
  },
});

// получение данных пользователя
api
  .getUserData()
  .then((res) => {
    user.setUserInfo({
      name: res.name,
      profession: res.about,
      id: res._id,
      avatar: res.avatar,
    });
  })
  .then(() => getStartCard())
  .catch((err) =>
    console.log(`Невозможно получить данные пользователя: ${err.status}`)
    );
    
// валидация формы профайла
const profileFormValidator = new FormValidator(formValidationConfig, formProfile);
profileFormValidator.enableValidation();

// валидация формы добавления карточек
const cardFormValidator = new FormValidator(formValidationConfig, formAddCard);
cardFormValidator.enableValidation();

// валидация формы авы
//const avatarFormValidator = new FormValidator(formValidationConfig, formAvatar);
//avatarFormValidator.enableValidation();

// карточки
const defaultCardList = new Section({
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    }
  },
  elementsContainer
);

// получение стартовых карточек
const getStartCard = () => {
  api
    .getInitialCards()
    .then((data) => {
      console.log("Карточки загружены с сервера");
      const startCardArr = data.map((item) => {
        return {
          name: item.name,
          link: item.link,
          likes: item.likes,
          _id: item._id,
          owner: item.owner._id,
          createdDate: item.createdAt,
        };
      });
      const startCardArrSorted = startCardArr.sort((a, b) => {
        return new Date(a.createdDate) - new Date(b.createdDate);
      });
      defaultCardList.renderItems(startCardArrSorted);
    })
    .catch((err) => {
      console.log(
        `Не удалось загрузить данные с сервера, ошибка: ${err.status}`
      );
      defaultCardList.renderItems(initialCards);
    });
};

// создание карточки через класс Card
function createCard(cardDetails) {
  const card = new Card(
    cardDetails,
    '.template',

    function handleFullScreen() {
      imageFullScreen.open(cardDetails)
    },

    function handleDeleteCard(card) {
      popupWithConfirmation.open(card, cardDeleteButton)
    },

    function handleLike(cardDetails) {
      likeCard(cardDetails)
    },

    user.getUserId()
  );

  const cardElement = card.renderCard();
  return cardElement;
}

// добавить новую карточку
const addNewPost = (data) => {
  btnLoading(popupAddCard, buttonPopupSubmit, true);
  api
    .addNewCard(data)
    .then((res) => {
      return createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        owner: res.owner._id,
      });
    })
    .then((data) => {
      defaultCardList.addItem(data);
    })
    .then(() => cardPopup.close())
    .catch((err) => console.log(`Не удалось добавить карточку: ${err.status}`))
    .finally(() => {
      btnLoading(popupAddCard, buttonPopupSubmit, false);
    });
};

// лайк
const likeCard = (card) => {
  if (card.isLiked()) {
    api
      .unlikeCard(card._idCard)
      .then((res) => {
        card.setLike(res.likes);
        card.toggleLike();
      })
      .catch((err) => console.log(err.status));
  } else {
    api
      .likeCard(card._idCard)
      .then((res) => {
        card.setLike(res.likes);
        card.toggleLike();
      })
      .catch((err) => console.log(err.status));
  }
};

// кнопка загрузки
const btnLoading = (popupSelector, button, loading) => {
  const btnState = popupSelector.querySelector(button);
  if (loading) {
    return (btnState.textContent = "Сохранение...");
  }
    return (btnState.textContent = "Сохранить");
};

// попап профайла
const profilePopup = new PopupWithForm('.popup_edit-profile',
  function submitForm(data) {
    btnLoading(popupEditProfile, buttonPopupSubmit, true);
    api
      .patchUserData(data)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          position: res.about,
          id: res._id,
          avatar: res.avatar,
        });
      })
      .then(() => profilePopup.close())
      .catch((err) => `Не удалось удалить карточку: ${err.status}`)
      .finally(() => {
        btnLoading(popupEditProfile, buttonPopupSubmit, false);
      });
  }
);

// попап карточки
const cardPopup = new PopupWithForm('.popup_add-card', (data) => {
  addNewPost(data);
})

// попап аватарки
const avatarPopup = new PopupWithForm('.popup_change-avatar',
  function submitForm(data) {
    btnLoading(popupProfileAvatar, buttonPopupSubmit, true);
    api
      .changeAvatar(data)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          position: res.about,
          id: res._id,
          avatar: res.avatar,
        });
      })
      .then(() => avatarPopup.close())
      .catch((err) => err.status)
      .finally(() => {
        btnLoading(popupProfileAvatar, buttonPopupSubmit, false);
      });
  }
);

// попап с подтверждением
const popupWithConfirmation = new PopupWithConfirmation('.popup_delete-card',
  function submitForm(card) {
    cardDeleteButton.textContent = 'Удаление...';
    api
      .deleteCard(card._idCard)
      .then(() => card.delete())
      .then(() => popupWithConfirmation.close())
      .catch((err) => `Не удалось удалить карточку: ${err.status}`)
      .finally(() => {
        cardDeleteButton.textContent = 'Карта удалена';
      });
  }
);

// открытие попапа редактирования профиля по клику
profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetErrorValidation();
  const { name, profession } = user.getUserInfo();
  userNameInput.value = name;
  userProfessionInput.value = profession;
  profilePopup.open();
});

// открытие попапа добавления карточки по клику
profileAddButton.addEventListener('click', () => {
  cardFormValidator.resetErrorValidation();
  cardPopup.open();
});
// открытие попапа редактирования аватара по клику
avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
  //avatarFormValidator.resetErrorValidation();
});