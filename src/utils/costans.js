import yorkOne from '../images/IMG_0665.JPG';
import yorkTwo from '../images/IMG_0666.JPG';
import yorkThree from '../images/IMG_0667.JPG';
import mainkunOne from '../images/IMG_7379.JPEG';
import mainkunTwo from '../images/OXVX6251.JPG';
import cats from '../images/andrew-keymaster-DzN9jwiDZPg-unsplash.jpg';

//Карточки мест
const initialCards = [{
  name: 'Йоркширский терьер',
  link: yorkOne
},
{
  name: 'Йоркширский терьер',
  link: yorkTwo
},
{
  name: 'Йоркширский терьер',
  link: yorkThree
},
{
  name: 'Мэйнкун',
  link: mainkunOne
},
{
  name: 'Мэйнкун',
  link: mainkunTwo
},
{
  name: 'Котики',
  link: cats
}
];


const popupElementProfile = document.querySelector('.popup_place_profile')
const popupElementAdd = document.querySelector('.popup_place_card')
const editName = popupElementProfile.querySelector('.popup__item_edit_name')
const editJob = popupElementProfile.querySelector('.popup__item_edit_job')
const profile = document.querySelector('.profile')
const popupOpenButtonProfileElement = profile.querySelector('.profile__button_type_edit')
const popupOpenCardAddElement = profile.querySelector('.profile__button_type_add')
const placeCase = document.querySelector('.card-grid');
const titleProfile = profile.querySelector('.profile__title')
const jobProfile = profile.querySelector('.profile__job')
const avatarSelector = document.querySelector('.profile__logo')
const avatarPopup = document.querySelector('.popup_place_avatar')
const avatarSubmitButton = avatarPopup.querySelector('.popup__submit-button')
const avatarEditButton = profile.querySelector('.profile__avatar-edit-button')
const popupConfirm = document.querySelector('.popup_confirm-delete')
const newTemplate = document.querySelector('.template')

//Селекторы для запуска валидности инпутов
const selectors = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_visible'
}

export {
  initialCards,
  popupElementProfile,
  popupElementAdd,
  editName,
  editJob,
  popupOpenButtonProfileElement,
  popupOpenCardAddElement,
  placeCase,
  selectors,
  titleProfile,
  jobProfile,
  avatarSelector,
  avatarPopup,
  avatarSubmitButton,
  avatarEditButton,
  popupConfirm,
  newTemplate
}