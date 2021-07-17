const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
}

const runErrorMessage = (inputElement) => {
    if(inputElement.validity.typeMismatch){
    return 'Введите верный адрес сайта'
    }

    if(inputElement.validity.valueMissing){
      return 'Вы пропустили это поле'
    }

  return inputElement.validationMessage
}

const checkValidityInput = (formElement, inputElement) => {
  const isInputNottValid = !inputElement.validity.valid;

  if(isInputNottValid){
    const errorMessage = runErrorMessage(inputElement);

    showInputError(formElement, inputElement, errorMessage);
  } else{
    hideInputError(formElement, inputElement);
  }
}

const toggleButtonState = (inputList, buttonElement) => {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid);

  if(hasNotValidInput) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add('popup__button_disabled')
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove('popup__button_disabled')
  }
}

const setEventListeners = (formElement, inputSelector) =>{
formElement.addEventListener("submit", (event) =>{
  event.preventDefault();
});

const inputList = Array.from(formElement.querySelectorAll(inputSelector));
const buttonElement = formElement.querySelector('.popup__button')

inputList.forEach(inputElement => {
  inputElement.addEventListener('input', (event) => {
    event.preventDefault();
    checkValidityInput(formElement, inputElement);
    toggleButtonState(inputList, buttonElement)
  })
})
toggleButtonState(inputList, buttonElement)
}
const enableValidation = ({formSelector, inputSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {setEventListeners(formElement, inputSelector)
  })
}
  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
  });