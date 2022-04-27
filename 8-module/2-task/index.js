import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render(products);
    // this.productCardsFiltered = [];
    this.filters = {
      noNuts: false, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 4, // числа от 0 до 4
      category: '' // уникальный идентификатор категории товара
    };
  }

  render(prod) {
    //console.log(prod);
    let productCards = [];
    
    prod.map(item => {
      let newCard = new ProductCard(item).elem;
      // console.log(newCard);

      productCards.push(`<div class="card">${newCard.innerHTML}</div>`);
    });   

    const productGrid = createElement(`
    <div class="products-grid">
        <div class="products-grid__inner">
        ${productCards.join('')}    
        </div>
    </div>`);

    this.productGrid = productGrid;

    this.productGrid.addEventListener('click', event =>{
      if (event.target.closest('BUTTON')) {        
        const name = event.target.parentElement.parentElement.querySelector('.card__title').innerText;        
        const pressEvent = new CustomEvent("product-add", { 
          detail: name, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });
        event.target.dispatchEvent(pressEvent);      
      }           
    });

    return this.productGrid;
  }

  updateFilter(filter) {    
    let productCardsFiltered = [];
    
    for (let key in filter) {
      this.filters[key] = filter[key];
    }  

    this.products.forEach(element => 
    {
      let noNut = (this.filters["noNuts"] === true && element["nuts"] != true) || this.filters["noNuts"] === false;
      let vegetarian = element["vegeterian"] == this.filters["vegeterianOnly"] == true || this.filters["vegeterianOnly"] === false; 
      if (noNut && vegetarian &&
        element["spiciness"] <= this.filters["maxSpiciness"] &&
        (element["category"] == this.filters["category"] || this.filters["category"] == '' )
      ) 
      {          
        productCardsFiltered.push(element);                  
      }});   
    
    document.querySelector(".products-grid__inner").remove();    
    document.querySelector('.products-grid').append(this.render(productCardsFiltered).querySelector('.products-grid__inner'));

  }
}
