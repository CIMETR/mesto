export class FormValidator{
  constructor(config, formSelector){
  this._inputSelector = config.inputSelector //'.popup__item', //инпуты 
  this._submitButtonSelector = config.submitButtonSelector //'.popup__submit-button', //кнопки 
  this._inactiveButtonClass = config.inactiveButtonClass //'popup__submit-button_disabled', //неактивные кнопки 
  this._inputErrorClass = config.inputErrorClass //'popup__item_type_error', //подчеркивает красным незаполненные поля 
  this._errorClass = config.errorClass //'popup__input-error_visible' //делает сообщение об ошибке видимым 
  
  this._formSelector = formSelector //'.popup__form', формы
  
  // Найдём все поля формы и сделаем из них массив
  this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
  // Найдём в текущей форме кнопку отправки
  this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  //показывает ошибку
  _showInputError(input, errorMessage) {
    const formError = this._formSelector.querySelector(`#${input.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  //скрывает ошибку 
  _hideInputError(input){
    const formError = this._formSelector.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    // Очистим ошибку
    formError.textContent = '';
  };

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
      return !inputElement.validity.valid;
    })
  };

  _isValid(input) {
    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input, input.validationMessage);
    } else {
  // Если проходит, скроем
      this._hideInputError(input);
    }
  };

  //функция неактивности кнопки
  _toggleButtonState() {
  // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(this._inputList)) {
      // сделать кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true)
    } else {
      // иначе сделать кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled')
    }
  };

  //слушатель 
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners()
    }

  resetValidation() {
    this._inputList.forEach(input=>{
      this._hideInputError(input)
      this._toggleButtonState()
    })
  
    }
}