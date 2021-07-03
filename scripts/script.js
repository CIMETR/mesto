//Карточки мест
const initialCards = [
  {
    name: 'Йоркширский терьер',
    link: './images/IMG_0665.JPG'
  },
  {
    name: 'Йоркширский терьер',
    link: './images/IMG_0666.JPG'
  },
  {
    name: 'Йоркширский терьер',
    link: './images/IMG_0667.JPG'
  },
  {
    name: 'Мэйнкун',
    link: './images/IMG_7379.JPEG'
  },
  {
    name: 'Мэйнкун',
    link: './images/OXVX6251.JPG'
  },
  {
    name: 'Котики',
    link: './images/andrew-keymaster-DzN9jwiDZPg-unsplash.jpg'
  }
]; 


const popupElement = document.querySelector('.popup')
const popupElementAdd = document.querySelector('.popup_place_card')
const popupSaveButtonElement = popupElement.querySelector('.popup__button')
const popupCloseButtonElement = popupElement.querySelector('.popup__esc-button')
const editName = popupElement.querySelector('.popup__input_edit_name')
const editJob = popupElement.querySelector('.popup__input_edit_job')
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__title')
const profileJob = profile.querySelector('.profile__job')
const popupOpenButtonElement = profile.querySelector('.profile__button_type_edit')
const popupOpenCardAddElement = profile.querySelector('.profile__button_type_add')
const popupCloseAddElement = popupElementAdd.querySelector('.popup__esc-button_card-add')
const popupSaveAddElement = popupElementAdd.querySelector('.popup__button')
const popupZoomImage = document.querySelector('.popup_zoom-image')
const imgPopupZoom = popupZoomImage.querySelector('.popup__image')
const captionPopupZoom = popupZoomImage.querySelector('.popup__caption')
const popupZoomImageClose = popupZoomImage.querySelector('.popup__esc-button_zoom-image')
const placesTemplate = document.querySelector('.template').content;
const placeCase = document.querySelector('.card-grid');
const newNamePlace = popupElementAdd.querySelector('.popup__input_place_name');
const newUrlImage = popupElementAdd.querySelector('.popup__input_place_url');

const openPopup = function(selectPopup) {
  selectPopup.classList.add('popup__opened');
}

const closePopup = function(selectPopup) {
  selectPopup.classList.remove('popup__opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return
  }

  closePopup(popupElement);
}

//редактирование профля
const addTextProfile = function(evt){
  evt.preventDefault()
  profileName.textContent = editName.value
  profileJob.textContent = editJob.value

  closePopup(popupElement)
}

//добавления новых карточек
const addNewCard = function(evt){
  evt.preventDefault();
  const popupNamePlace = newNamePlace.value
  const popupImagePlace = newUrlImage.value
  placeCase.prepend(getCard(popupNamePlace, popupImagePlace));
  closePopup(popupElementAdd)
  newNamePlace.value = "";
  newUrlImage.value = "";
}

//Удаление
function cardDelete(event){
  const card = event.target.closest('.card-grid__item');
  card.remove();
}

//лайк
function cardLike(event){
  const card = event.target.closest('.card-grid__like');
  card.classList.toggle('card-grid__like_target_active');
}

//зум изображения
function handlePreviewImage(name, link) {
  openPopup(popupZoomImage)
  imgPopupZoom.src = link
  imgPopupZoom.alt = name
  captionPopupZoom.textContent = name
}




//рисуем заготовленные карточки
function getCard(name, link){
  const createCards = placesTemplate.cloneNode(true);
  createCards.querySelector('.card-grid__title').textContent = name;
  const createImage = createCards.querySelector('.card-grid__image');
  createImage.src = link
  createImage.alt = name
  
  
  
  setEventListeners()
  
  return createCards;
  
  function setEventListeners(){
    createCards.querySelector('.card-grid__remove').addEventListener('click', cardDelete);
    createCards.querySelector('.card-grid__like').addEventListener('click', cardLike);
    createImage.addEventListener('click', () => {
      handlePreviewImage(name, link)
    });
  }
}

initialCards.forEach(function(el){
  placeCase.append(getCard(el.name, el.link))
});

popupOpenButtonElement.addEventListener('click', () => {
  openPopup(popupElement)
  editName.value = profileName.textContent,
  editJob.value = profileJob.textContent
});
popupCloseButtonElement.addEventListener('click', () => closePopup(popupElement));
popupElement.addEventListener('click', closePopupByClickOnOverlay);
popupElement.addEventListener('submit', addTextProfile);
popupOpenCardAddElement.addEventListener('click', () => openPopup(popupElementAdd));
popupCloseAddElement.addEventListener('click', () => closePopup(popupElementAdd));
popupElementAdd.addEventListener('submit', addNewCard);
popupZoomImageClose.addEventListener('click', () => closePopup(popupZoomImage))