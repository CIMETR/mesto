const popupElement = document.querySelector('.popup')
const popupSaveButtonElement = popupElement.querySelector('.popup__button')
const popupCloseButtonElement = popupElement.querySelector('.popup__esc-button')
const editName = popupElement.querySelector('.popup__input_edit_name')
const editJob = popupElement.querySelector('.popup__input_edit_job')
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileJob = profile.querySelector('.profile__job')
const popupOpenButtonElement = profile.querySelector('.profile__button_type_edit')


const openPopup = function() {
  popupElement.classList.add('popup__opened');
  editName.value = profileName.textContent;
  editJob.value = profileJob.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup__opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return
  }

  closePopup()
}

const addTextProfile = function(evt){
  evt.preventDefault()
  profileName.textContent = editName.value
  profileJob.textContent = editJob.value
  closePopup()
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', addTextProfile);