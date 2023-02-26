class FormValidator {
  constructor (formValidationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = formValidationConfig.inputSelector;
    this._errorClass = formValidationConfig.errorClass;
    this._buttonSelector = formValidationConfig.buttonSelector;
    this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;
  }
  
  // Предотвращение отправки
  _disableSubmit (event) {
    event.preventDefault();
  }
  
  // Проверка валидности инпута и по результатам добавлять или удалять класс и текст ошибки
  _handleFormInput (event) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
    
    if (input.validity.valid) {
      input.classList.remove(this._errorClass);
      errorElement.textContent = '';
    } else {
      input.classList.add(this._errorClass);
      errorElement.textContent = input.validationMessage;
    }
  }
  
  // Проверка кнопки. Кнопка активируется/деактивируется по результатам проверки валидности формы
  _toggleButton () {
    const buttonSubmit = this._formElement.querySelector(this._buttonSelector);
    const isFormValid = this._formElement.checkValidity();
    
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle(this._buttonDisabledClass, !isFormValid);
  }
  
  // Деактивация кнопки через reset
  _deactivateButton() {
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButton();
      }, 0);
    });
  }
  
  // Нахождение и перебор всех инпутов. Взяли из инпутов элемент и повесили на него слушатель в котором запускается handleFormInput 
  _addInputListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    
    inputList.forEach((item) => {
      item.addEventListener('input', (event) => {
        this._handleFormInput(event)
      });
    });
  }

  // Валидация
  enableValidation() {
    this._formElement.addEventListener('submit', this._disableSubmit);
    this._formElement.addEventListener('input', () => {
      this._toggleButton();
    });
    
    this._deactivateButton();
    this._addInputListeners();
    this._toggleButton();
  }

}

export {FormValidator};