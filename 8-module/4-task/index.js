import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (typeof product == "object" && product != null) {
      let cartItem = {
        product: product,
        count: 1
      };
  
      let flag = true;
      
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].product === cartItem.product) {
          this.cartItems[i].count += 1;        
          flag = false;
        }
      }
  
      if (flag) {
        this.cartItems.push(cartItem);      
      }      
      
      this.onProductUpdate(this.cartItems);                  
    }    
  }

  cartSearch(name) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].product.id == name) {
        this.curId = i;        
      }
    }
    return this.cartItems[this.curId];
  }

  updateProductCount(productId, amount) {
    for (let i = 0; i < this.cartItems.length; i++) {

      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;        
      }
      if (this.cartItems[i].count < 1) {
        if (this.cartItems.length === 1) {this.cartItems = [];
        } else {this.cartItems.splice(i, 1);
        } break;
      }              
    }      
      
    this.onProductUpdate();    
  }  

  isEmpty() {    
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    let totalCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }       
    return totalCount; 
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {      
      totalPrice += this.cartItems[i].product.price * this.cartItems[i].count;
    }       
    return totalPrice;    
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();   
    
    let productItems = '';
    for (let i = 0; i < this.cartItems.length; i++) {
      modal.setBody(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));
    }

    modal.setBody(this.renderOrderForm());

    modal.setTitle('Your order');
    // modal.setBody(createElement(productItems));
    modal.open();    

    document.querySelector('.modal').addEventListener('click', event =>{  
      if (event.target.closest('BUTTON').classList.contains('cart-counter__button_plus')) {        
        let idProduct = event.target.closest('.cart-product').dataset.productId;        
        this.updateProductCount(idProduct, 1);
        let newCount = Number(event.target.closest('.cart-product').querySelector('.cart-counter__count').innerText);
        event.target.closest('.cart-product').querySelector('.cart-counter__count').innerText = newCount + 1;      
                
        let newTotalPrice = this.cartSearch(idProduct).product.price * this.cartSearch(idProduct).count; 
        event.target.closest('.cart-product').querySelector('.cart-product__price').innerText = `€${newTotalPrice.toFixed(2)}`;
        document.querySelector('.cart-buttons__info-price').innerText = `€${this.getTotalPrice().toFixed(2)}`;
      }    

      if (event.target.closest('BUTTON').classList.contains('cart-counter__button_minus')) {        
        let idProduct = event.target.closest('.cart-product').dataset.productId;        
        this.updateProductCount(idProduct, -1);
        let newCount = Number(event.target.closest('.cart-product').querySelector('.cart-counter__count').innerText) - 1;

        if (this.getTotalCount() == 0) {
          new Modal().close();
        }
        if (newCount === 0) {
          event.target.closest('.cart-product').remove(); 
        } else {
          let newTotalPrice = this.cartSearch(idProduct).product.price * this.cartSearch(idProduct).count; 
          event.target.closest('.cart-product').querySelector('.cart-product__price').innerText = `€${newTotalPrice.toFixed(2)}`;
          event.target.closest('.cart-product').querySelector('.cart-counter__count').innerText = newCount;
          document.querySelector('.cart-buttons__info-price').innerText = `€${this.getTotalPrice().toFixed(2)}`;
        }       
      }       
    });
    

    document.querySelector('.cart-form').addEventListener('submit', event => {
      this.onSubmit(event);
    });
    
  }

  onProductUpdate() {       
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    event.target.querySelector('.btn-group__button').classList.add('is-loading');

    const newModalBody = createElement(`<div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(document.querySelector('.cart-form'))
    }).then(response => {
      if (response.ok) {
        document.querySelector('.modal__title').innerText = 'Success!';
        this.cartItems = [];
        document.querySelector('.modal__body').innerHTML = '';
        document.querySelector('.modal__body').insertAdjacentElement('beforeend', newModalBody); 
        this.cartIcon.update(this);     
      }});   
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

