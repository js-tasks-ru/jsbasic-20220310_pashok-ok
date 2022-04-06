import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render () {
    
    const newCards = this.slides.map(item => {
      return `<div class="carousel__slide" data-id="${item.id}">
      <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    }).join('');
    
    const carousel = createElement(`<div class="carousel">    
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${newCards}
    </div>
    </div>
  </div>`);

    let counter = 0;
    let rightArrow = carousel.querySelector('.carousel__arrow_right');
    let leftArrow = carousel.querySelector('.carousel__arrow_left');
    let image = carousel.querySelector('.carousel__inner');
    let Xoffset = 0;
    let maxCount = carousel.querySelectorAll('.carousel__slide').length;    

    //функция, которая считает слайды и гасит стрелочки
    function arrowSwitcher() {    
      if (counter === 0) {
        leftArrow.style.display = 'none';
      } else {leftArrow.style.display = '';}
      if (counter === maxCount - 1) {
        rightArrow.style.display = 'none';    
      } else {rightArrow.style.display = '';}       
    }
    arrowSwitcher(); //инициализация отображения стрелочек
  
    rightArrow.onclick = function() {
      counter += 1;
      let offset = image.offsetWidth;
      Xoffset -= offset;    
      image.style.transform = `translateX(${Xoffset}px)`;
      arrowSwitcher(counter);     
    };

    leftArrow.onclick = function() {
      counter -= 1;
      let offset = image.offsetWidth;
      Xoffset += offset;
      image.style.transform = `translateX(${Xoffset}px)`;
      arrowSwitcher(counter);       
    };   
    
    carousel.addEventListener('click', event =>{
      if (event.target.closest('BUTTON')) {        
        const slide = event.target.closest('BUTTON').parentElement.parentElement.dataset;
        const pressEvent = new CustomEvent("product-add", { 
          detail: slide.id, // Уникальный идентификатора товара из объекта товара
          bubbles: true // это событие всплывает - это понадобится в дальнейшем
        });
        event.target.dispatchEvent(pressEvent);      
      }           
    });

    return carousel;
  }
}
