export class Section { 
  constructor({renderer}, containerSelector) { 
    this._renderer = renderer; 
    this._container = containerSelector; 
  } 
  render(items) { 
    items.forEach(item =>  
      this._renderer(item) 
    ); 
} 
  addItems(element) { 
      this._container.prepend(element); 
  }
  1 
  setItems(element){
    this._container.append(element)
  }
}