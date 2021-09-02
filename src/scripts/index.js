import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {Section} from './Section.js';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import UserInfo from './UserInfo.js'

import yorkOne from '../images/IMG_0665.JPG';
import yorkTwo from '../images/IMG_0666.JPG';
import yorkThree from '../images/IMG_0667.JPG';
import mainkunOne from '../images/IMG_7379.JPEG';
import mainkunTwo from '../images/OXVX6251.JPG';
import cats from '../images/andrew-keymaster-DzN9jwiDZPg-unsplash.jpg';
import '../pages/index.css';


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


// блок редактирования профиля
const newUser = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__job'
});

function formSubmitHandler(inputValuesObject) {
  newUser.setUserInfo(inputValuesObject);
  popupViewEditor.close();
}

const popupViewEditor = new PopupWithForm('.popup_place_profile', formSubmitHandler);
popupViewEditor.setEventListeners();

popupOpenButtonProfileElement.addEventListener('click', () => {
  const userInfo = newUser.getUserInfo();
  editName.value = userInfo.name;
  editJob.value = userInfo.job;
  profileEditFormValidator.enableValidation()
  popupViewEditor.open();
});

//зум изображения
const popupViewCard = new PopupWithImage('.popup_zoom-image');
popupViewCard.setEventListeners();

function handleCardClick(name, link) {
  popupViewCard.open(name, link);
}

//Создание новых карточек
const newCard = new PopupWithForm('.popup_place_card', (item) => {
  const card = new Card(item.nameCard, item.link, '.template', handleCardClick)
  const cardElement = card.generateCard()
  cardList.addItem(cardElement)
  cardAddFormValidator.enableValidation()
  newCard.close()
})
newCard.setEventListeners()
popupOpenCardAddElement.addEventListener('click', () => {
  newCard.open()
  cardAddFormValidator.enableValidation()
});

//Селекторы для запуска валидности инпутов
const selectors = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_visible'
}
//Проверка валидности данных профиля
const profileEditFormValidator = new FormValidator(selectors, popupElementProfile)
profileEditFormValidator.enableValidation()
//Проверка валидности новых карточек
const cardAddFormValidator = new FormValidator(selectors, popupElementAdd)
cardAddFormValidator.enableValidation()

const cardList = new Section({
    items: initialCards.reverse(),
    renderer: item => {
      const card = new Card(item.name, item.link, '.template', handleCardClick)
      const cardElement = card.generateCard()
      cardList.addItem(cardElement)
    },
  },
  placeCase);
cardList.render();