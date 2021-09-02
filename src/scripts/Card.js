export class Card {
  constructor(name, link, templateSelector, handleCardClick){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  //Удаление
  _cardDelete(){
    this._element.remove();
  }

  //лайк
  _cardLike(){
    this._element
      .querySelector('.card-grid__like')
      .classList.toggle('card-grid__like_target_active');
  }

  _setEventListeners(){
    this._deleteBtn.addEventListener('click',()=>{
      this._cardDelete()
    } );

    this._likeBtn.addEventListener('click',() =>{
      this._cardLike()
    });

    this._element.querySelector('.card-grid__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  //рисуем заготовленные карточки
  
  
  _getCard(){
    this._createCards = document.querySelector(this._templateSelector).content;
    return this._createCards.querySelector('.card-grid__item').cloneNode(true);
  }
  generateCard(){
    this._element = this._getCard();

    

    this._element.querySelector('.card-grid__title').textContent = this._name;
    this._createImage = this._element.querySelector('.card-grid__image');
    this._createImage.src = this._link
    this._createImage.alt = this._name

    this._deleteBtn = this._element.querySelector('.card-grid__remove')
    this._likeBtn = this._element.querySelector('.card-grid__like')
    
    this._setEventListeners();
    
    return this._element
  }
}
