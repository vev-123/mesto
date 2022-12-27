let profileEditButton = document.querySelector('.profile__edit-button');
let popUp = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__close-button')

let popupForm = document.querySelector('.popup__form')
let userNameInput = popupForm.querySelector('.popup__input_data_name');
let userProfessionInput = popupForm.querySelector('.popup__input_data_profession');

let profileName = document.querySelector('.profile__title');
let profileProfession = document.querySelector('.profile__subtitle');

function openPopup () {
  userNameInput.value = profileName.textContent;
  userProfessionInput.value = profileProfession.textContent;
  popUp.classList.add('popup_opened');
}

function closePopup () {
  popUp.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = userNameInput.value;
  profileProfession.textContent = userProfessionInput.value;
  closePopup ();
}

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', handleFormSubmit);