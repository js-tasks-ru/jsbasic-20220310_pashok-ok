import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon); 
  }

  compsRender() {
    let carousel = new Carousel(slides);
    document.querySelector("[data-carousel-holder]").insertAdjacentElement('afterbegin', carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector("[data-ribbon-holder]").insertAdjacentElement('afterbegin', this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    console.log(this.stepSlider.value);
    document.querySelector("[data-slider-holder]").insertAdjacentElement('afterbegin', this.stepSlider.elem);

    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);          
  }

  async gridRender() {
    let response = await fetch('products.json');
    this.products = await response.json();
    
    this.productGrid = new ProductsGrid(this.products);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productGrid.elem); 
    
  }

  filterFunc() {
    
    this.productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  async render() {
    await this.compsRender();
    await this.gridRender();
    await this.filterFunc();
    await this.eventListeners();
  }    

  eventListeners() {
    document.querySelector('.filters__slider').addEventListener('slider-change', event => {      
      this.filterFunc({
        maxSpiciness: event.detail,
      }); 
    });

    document.querySelector('.ribbon__inner').addEventListener('ribbon-select', event => {      
      this.filterFunc({
        category: event.detail,
      }); 
    });

    document.querySelector('.filters__inner').addEventListener('change', event =>{
      if (event.target.id == 'nuts-checkbox') {        
        this.filterFunc({
          noNuts: event.target.checked
        });
      }
      
      if (event.target.id == 'vegeterian-checkbox') {        
        this.filterFunc({
          vegeterianOnly: event.target.checked
        });
      }
    });

    document.body.addEventListener('product-add', event =>{
      
      let curId;
      
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].name == event.detail || this.products[i].id == event.detail) {          
          curId = i;        
        }
      }            
      this.cart.addProduct(this.products[curId]);            
    });
  }
  
}
