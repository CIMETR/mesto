import {Card} from "../scripts/Card.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {Section} from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm';
import PopupWithImage from '../scripts/PopupWithImage';
import UserInfo from '../scripts/UserInfo.js'
import Api from '../scripts/Api.js'
import PopupWithConfirm from "../scripts/PopupWithConfirm.js";
import {
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
  avatarEditButton,
  newTemplate,
  avatarPopup
} from '../utils/costans.js'

import '../pages/index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    'authorization': '68b64d50-5120-47e2-bc75-6d39addfe324',
    'Content-Type': 'application/json',
  },
});

//Проверка валидности данных профиля
const profileEditFormValidator = new FormValidator(selectors, popupElementProfile)
profileEditFormValidator.enableValidation()
//Проверка валидности новых карточек
const cardAddFormValidator = new FormValidator(selectors, popupElementAdd)
cardAddFormValidator.enableValidation()
//Проверка валидности fdfnfhf
const avatarEditFormValidator = new FormValidator(selectors, avatarPopup)
avatarEditFormValidator.enableValidation()
let userId

api.getAllNeededData()
  .then(( [card, inputValuesObject] ) => {
    newUser.setUserInfo(inputValuesObject)
    userId = inputValuesObject._id
    
    originalCards.render(card)
  })
  .catch((err) => {console.log(err)})


// блок редактирования профиля
const newUser = new UserInfo({
  nameSelector: titleProfile,
  jobSelector: jobProfile,
  avatarSelector: avatarSelector
});

const popupViewEditor = new PopupWithForm('.popup_place_profile', inputValuesObject => {
  popupViewEditor.renderLoading(true)
  api.setUserInfoApi(inputValuesObject)
    .then((inputValuesObject) => {
      newUser.setUserInfo(inputValuesObject)
      popupViewEditor.close()
    })
    .catch((err) => console.log(err))
    .finally( () => popupViewEditor.renderLoading(false))
})
popupViewEditor.setEventListeners()

popupOpenButtonProfileElement.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  const userData = newUser.getUserInfo()

  editName.value = userData.name;
  editJob.value = userData.job;

  profileEditFormValidator.enableValidation()

  popupViewEditor.open()
})

const popupAvatarEdit = new PopupWithForm('.popup_place_avatar', inputValuesObject => {
  popupAvatarEdit.renderLoading(true)
  api.handleUserAvatar(inputValuesObject)
    .then((inputValuesObject) => {
      newUser.setUserAvatar(inputValuesObject)
      popupAvatarEdit.close()
    })
    .catch((err) => console.log(err))
    .finally( () => popupAvatarEdit.renderLoading(false))
})
popupAvatarEdit.setEventListeners()

avatarEditButton.addEventListener('click', () => {
  avatarEditFormValidator.resetValidation()
  popupAvatarEdit.open()
})

//зум изображения
const popupViewCard = new PopupWithImage('.popup_zoom-image');
popupViewCard.setEventListeners();



//Прорисовка изначальных карточек
const originalCards = new Section({
  renderer: (item) => {
    const card = createCard(item, newTemplate)
    const originalCardsElement = card.getCard()
    originalCards.setItems(originalCardsElement)

  }
}, placeCase)

function createCard(item, template) {
  const card = new Card({
    item, handleCardClick: (name, link) => {
      popupViewCard.open(name,link)
    },
    deleteCard:()=>{
      popupDelete.open(card)
    },
    likeCard:()=>{
      const likedCard = card.likedCard();
      const result = likedCard ? api.dislike(card.getItemId()) : api.like(card.getItemId());

      result.then(data => {
        card.setLikes(data.likes);
        card.renderLikes()

      }).catch((err) => {
        console.log(err);
      })
    }
  }, template,userId,item._id)

  

  return card
}

// создание новых карточек
const newCard = new PopupWithForm(
  '.popup_place_card',
  (item) => {
    newCard.renderLoading(true)
    api.addUserCard(item)
        .then(item => {
          const newCards = createCard(item, newTemplate)
          const newAddedCard = newCards.getCard()
          originalCards.addItems(newAddedCard)
          newCard.close()
        })
        .catch((err)=>{
          console.log(err)
        })
        .finally(()=>{
          newCard.renderLoading(false)
        })
    
  })
newCard.setEventListeners()

const popupDelete = new PopupWithConfirm('.popup_confirm-delete',(evt,card)=>{
  deleteConfirm(evt,card)
})
popupDelete.setEventListeners()

function deleteConfirm(evt,newCard){
  console.log(evt)
  api.delete(newCard.getItemId())
    .then(() => {
      newCard.removeCard()
      popupDelete.close()
    })
    .catch((err) => {
      console.log(err); 
  });
}

popupOpenCardAddElement.addEventListener('click', function () {
  cardAddFormValidator.resetValidation()
  newCard.open()
})

