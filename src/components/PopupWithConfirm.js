import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup{
    constructor(popupSelector,submit){
        super(popupSelector)
        this._popup = document.querySelector(popupSelector)
        this._submit = submit
    }


    setEventListeners(){
        super.setEventListeners()
        this._popup.addEventListener('submit',(evt)=>{
            evt.preventDefault()
            this._submit(evt,this._card)
            
        })
    }

    open(card){
        this._card = card
        super.open()
    }
}