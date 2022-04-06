export default class ProductCard {
  constructor(product) {
    this.product = product;     
    this.elem = this.render();   
  }   
  
  render() {
    let comp = document.createElement('div');
    comp.classList.add('card'); 

    const cardCode = `      
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>`;
    comp.innerHTML = cardCode;

    const cardBtn = comp.querySelector('.card__button');   
    cardBtn.addEventListener('click', () =>{
      const pressEvent = new CustomEvent("product-add", { 
        detail: this.product.id, // Уникальный идентификатора товара из объекта товара
        bubbles: true // это событие всплывает - это понадобится в дальнейшем
      });
      cardBtn.dispatchEvent(pressEvent);      
    });
    return comp;      
  }  
 
}