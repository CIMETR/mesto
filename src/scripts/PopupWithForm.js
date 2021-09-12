import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleForSubmit) {
    super(popupSelector)
    this._handleForSubmit = handleForSubmit

    this._popupForm = this._popup.querySelector('.popup__form')
    this._inputList = this._popupForm.querySelectorAll('.popup__item')
    this._submit = (evt) =>{
      evt.preventDefault()
      this._handleForSubmit(this._getInputValues())
    }
    this._submitClick = this._submit.bind(this)
    this._submitButton = this._popup.querySelector('.popup__submit-button')
    this._defaultSubmitButton = this._submitButton.textContent
  }

  _getInputValues() {
    this._newValues = {}
    this._inputList.forEach(inputElement => {
      this._newValues[inputElement.name] = inputElement.value
    })
    return this._newValues
  }

  renderLoading(isLoading,message='Сохранение...'){
    if(isLoading){
      this._submitButton.textContent = message
    }else{
      this._submitButton.textContent = this._defaultSubmitButton
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', this._submitClick)
  }

  close() {
    super.close()
    this._popupForm.reset()
  }
}