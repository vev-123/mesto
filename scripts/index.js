let editButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button')

let popupForm = document.querySelector('.popup__form')
let titleAdd = popupForm.querySelector('.popup__title_add-text');
let subtitleAdd = popupForm.querySelector('.popup__subtitle_add-text');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup () {
  popUp.classList.add('popup_opened');
  titleAdd.value = profileTitle.textContent;
  subtitleAdd.value = profileSubtitle.textContent;
}

function closePopup () {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = titleAdd.value;
  profileSubtitle.textContent = subtitleAdd.value;
  closePopup ();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);