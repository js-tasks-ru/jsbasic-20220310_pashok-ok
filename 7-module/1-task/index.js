import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.value = '';
  }

  render() {
    const ribbonsItems = this.categories.map(item => {
      return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;      
    }).join('');

    const ribbonMenu = createElement(`<div class="ribbon">    
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <nav class="ribbon__inner">
    ${ribbonsItems}
    </nav>
    
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);   

    ribbonMenu.querySelectorAll('.ribbon__item')[0].classList.add('ribbon__item_active');    
    
    let ribbonInner = ribbonMenu.querySelector('.ribbon__inner');     
    let scrLeft = ribbonInner.scrollLeft;                 
    let scrRight; 

    let rightArrow = ribbonMenu.querySelector('.ribbon__arrow_right');
    let leftArrow = ribbonMenu.querySelector('.ribbon__arrow_left');          
    
    //функция, которая считает слайды и гасит стрелочки
    ribbonInner.addEventListener('scroll', event => {      
      
      let clientWidth = ribbonInner.clientWidth;       
      let scrWidth = ribbonInner.scrollWidth; 
      
      scrLeft = ribbonInner.scrollLeft;
      scrRight = scrWidth - scrLeft - clientWidth;
    
      if (scrLeft === 0) {        
        leftArrow.classList.remove('ribbon__arrow_visible');
      } else {leftArrow.classList.add('ribbon__arrow_visible');}
      if (scrRight < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');   
      } else {rightArrow.classList.add('ribbon__arrow_visible');}       
    }); 

    rightArrow.onclick = function() {               
      ribbonInner.scrollBy(350, 0);                   
    };

    leftArrow.onclick = function() {           
      ribbonInner.scrollBy(-350, 0);                  
    };   
    
    ribbonMenu.addEventListener('click', event =>{
      
      if (event.target.tagName === 'A') {  
        event.preventDefault();
        ribbonMenu.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
        event.target.classList.add('ribbon__item_active');  
        const category = event.target.dataset;
        this.value = category.id;                            
        const pressEvent = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
          detail: category.id, // уникальный идентификатора категории из её объекта
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });
        event.target.dispatchEvent(pressEvent);      
      }           
    });

    return ribbonMenu;  
  }
}
