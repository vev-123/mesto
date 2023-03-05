class FormValidator {
  constructor (formValidationConfig, formElement) {
    this._formElement = formElement;
    this._inputSelector = formValidationConfig.inputSelector;
    this._errorClass = formValidationConfig.errorClass;
    this._buttonSelector = formValidationConfig.buttonSelector;
    this._buttonDisabledClass = formValidationConfig.buttonDisabledClass;
    this._buttonElement = this._formElement.querySelector(this._buttonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }
  
  // Очистить ошибку
  _clearError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  
  // Показать ошибку
  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Проверка валидности инпута и по результатам добавлять или удалять методы показа/очистки ошибки
  _checkInputValidity (inputElement) {
    if (inputElement.validity.valid) {
      this._clearError(inputElement);
    } else {
      this._showError(inputElement);
    }
  }

  // Проверка кнопки. Кнопка активируется/деактивируется по результатам проверки валидности формы
  _toggleButton () {
    const isFormValid = this._formElement.checkValidity();
    
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(this._buttonDisabledClass, !isFormValid);
  }
  
  //Деактивация кнопки через reset
  _deactivateButton() {
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButton();
      }, 0);
    });
  }
  
  // Взяли из инпутов элемент и повесили на него слушатель в котором запускается _checkInputValidity и _toggleButton 
  _addInputListeners () {
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity(item)
        this._toggleButton();
      });
    });
  }

  // Валидация
  enableValidation() {
    this._deactivateButton();
    this._addInputListeners();
    this._toggleButton();
  }


  resetError() {
    this._inputList.forEach(inputElement => {
      this._clearError(inputElement);
    });
    this._toggleButton();
  }
  
}

export {FormValidator};