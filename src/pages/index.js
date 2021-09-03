import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {Section} from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm';
import PopupWithImage from '../scripts/PopupWithImage';
import UserInfo from '../scripts/UserInfo.js'
import {
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
} from '../utils/costans.js'

import '../pages/index.css';




// блок редактирования профиля
const newUser = new UserInfo({
  nameSelector: titleProfile,
  jobSelector: jobProfile
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

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

//Создание новых карточек
const newCard = new PopupWithForm('.popup_place_card', (item) => {
  cardList.addItem(createCard(item.nameCard, item.link, '.template', handleCardClick))
  cardAddFormValidator.enableValidation()
  newCard.close()
})
newCard.setEventListeners()
popupOpenCardAddElement.addEventListener('click', () => {
  newCard.open()
  cardAddFormValidator.enableValidation()
});


//Проверка валидности данных профиля
const profileEditFormValidator = new FormValidator(selectors, popupElementProfile)
profileEditFormValidator.enableValidation()
//Проверка валидности новых карточек
const cardAddFormValidator = new FormValidator(selectors, popupElementAdd)
cardAddFormValidator.enableValidation()

const cardList = new Section({
    items: initialCards.reverse(),
    renderer: item => {
      cardList.addItem(createCard(item.name, item.link, '.template', handleCardClick))
    },
  },
  placeCase);
cardList.render();