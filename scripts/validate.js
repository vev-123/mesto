const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__save-button',
  buttonDisabledClass: 'popup__save-button_disabled',
};

// Предотвращение отправки
function disableSubmit (event) {
  event.preventDefault();
}

// Нахождение и перебор всех форм. Запуск валидации
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

// Валидация
function enableFormValidation(form, config) {
  form.addEventListener('submit', disableSubmit);
  form.addEventListener('input', () => {
    toggleButton(form, config);
  });

  addInputListeners(form, config);
  toggleButton(form, config);
}

// Проверка валидности инпута и по результатам добавлять или удалять класс и текст ошибки
function handleFormInput (event, config) {
  const input = event.target;
  const inputId = input.id;
  const errorElement = document.querySelector(`#${inputId}-error`);
  
  if (input.validity.valid) {
    input.classList.remove(config.errorClass);
    errorElement.textContent = '';
  } else {
    input.classList.add(config.errorClass);
    errorElement.textContent = input.validationMessage;
  }
}

// Проверка кнопки. Кнопка активируется/деактивируется по результатам проверки валидности формы
function toggleButton (form, config) {
  const buttonSubmit = form.querySelector(config.buttonSelector);
  const isFormValid = form.checkValidity();

  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle('popup__save-button_disabled', !isFormValid);
}

// Нахождение и перебор всех инпутов. Взяли из инпутов элемент и повесили на него слушатель в котором запускается handleFormInput 
function addInputListeners (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  
  inputList.forEach(function (item) {
    item.addEventListener('input', (event) => {
      handleFormInput(event, config)
    });
  });
}

enableValidation(formValidationConfig);